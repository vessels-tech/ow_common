import { Resource } from "../model/Resource";
import { SomeResult, ResultType, makeSuccess, makeError } from "../utils/AppProviderTypes";
import DictType from "../utils/DictType";
import { User, DefaultUser } from "../model/User";
import UserStatus from "../enums/UserStatus";
import UserType from "../enums/UserType";
import * as admin  from "firebase-admin";
import { DocumentReference } from "@google-cloud/firestore";

type Firestore = admin.firestore.Firestore;

export class UserApi {
  firestore: Firestore;
  orgId: string;

  constructor(firestore: Firestore, orgId: string) {
    this.firestore = firestore;
    this.orgId = orgId;
  }

  public async addFavouriteResource(userId: string, resource: Resource): Promise<SomeResult<void>> {
    const favouritesResult = await this.getFavouriteResources(userId);
    if (favouritesResult.type === ResultType.ERROR) {
      return favouritesResult;
    }
    const favourites = favouritesResult.result;
    favourites[resource.id] = resource;

    return this.updateFavouriteResources(userId, favourites);
  }

  public async removeFavouriteResource(userId: string, resourceId: string): Promise<SomeResult<void>> {
    const favouritesResult = await this.getFavouriteResources(userId);
    if (favouritesResult.type === ResultType.ERROR) {
      return favouritesResult;
    }
    const favourites = favouritesResult.result;
    delete favourites[resourceId];

    return this.updateFavouriteResources(userId, favourites);
  }

  private async updateFavouriteResources(userId: string, favouriteResources: DictType<Resource>): Promise<SomeResult<any>> {
    return this.userRef(this.orgId, userId).set({ favouriteResources }, { merge: true })
      .then(() => makeSuccess(undefined))
      .catch((err: Error) => makeError(err.message))
  }

  public async getFavouriteResources(userId: string): Promise<SomeResult<DictType<Resource>>> {
    const userResult = await this.getUser(this.userRef(this.orgId, userId));
    if (userResult.type === ResultType.ERROR) {
      return userResult;
    }

    const user = userResult.result;
    return makeSuccess(user.favouriteResources);
  }

  public async getRecentResources(userId: string): Promise<SomeResult<Resource[]>> {
    const userResult = await this.getUser(this.userRef(this.orgId, userId));
    if (userResult.type === ResultType.ERROR) {
      return userResult;
    }

    const user = userResult.result;
    return makeSuccess(user.recentResources);
  }

  /**
   * Change the user's status
   */
  public async changeUserStatus(userId: string, status: UserStatus.Approved | UserStatus.Rejected): Promise<SomeResult<void>> {
    return this.userRef(this.orgId, userId).set({ status }, { merge: true })
      .then(() => makeSuccess(undefined))
      .catch((err: Error) => makeError(err.message))
  }

  public async changeUserType(userId: string, type: UserType): Promise<SomeResult<void>> {
    return this.userRef(this.orgId, userId).set({type}, { merge: true})
    .then(() => makeSuccess(undefined))
  }


  //
  // Helpers
  // ------------------------------------

  public userRef(orgId: string, userId: string): DocumentReference {
    return this.firestore.collection('org').doc(orgId).collection('user').doc(userId);
  }

  public async getUser(userRef: DocumentReference): Promise<SomeResult<User>> {
    return userRef.get()
    .then(sn => {
      const data = sn.data();
      if (!data) {
        return makeError<User>(`No data found for userRef:${userRef}`);
      }

      //Set the default user data here.
      return makeSuccess({
        ...DefaultUser,
        ...data
      });
    })
    .catch((err: Error) => makeError<User>(err.message))
  }

}