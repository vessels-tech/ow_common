import { Resource } from "../model/Resource";
import { SomeResult, ResultType, makeSuccess, makeError } from "../utils/AppProviderTypes";
import DictType from "../utils/DictType";

type Firestore = admin.firestore.Firestore;





export class UserApi {
  firestore: Firestore;
  orgId: string;

  constructor(firestore: Firestore, orgId: string) {
    this.firestore = firestore;
    this.orgId = orgId;
  }

  
  //
  // User
  // ------------------------------------

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
    //First we get the user - maybe there's a better way to do this...
    const result = await UserDoc.get<User>(this.firestore, this.orgId, userId);
    if (result.type === ResultType.ERROR) {
      return result;
    }

    const userDoc = result.result;
    userDoc.props = {
      ...userDoc.props,
      favouriteResources,
    };

    return userDoc.save();

  }

  private async getFavouriteResources(userId: string): Promise<SomeResult<DictType<Resource>>> {
    const result = await UserDoc.get<User>(this.firestore, this.orgId, userId);
    if (result.type === ResultType.ERROR) {
      return result;
    }

    const user = result.result.underlyingProps();
    return makeSuccess(user.favouriteResources);
  }

  public getRecentResources(userId: string): Promise<SomeResult<Resource[]>> {
    return null;
  }

  public addRecentResource(userId: string, resource: Resource): Promise<SomeResult<Resource[]>> {
    return null;
  }

  /**
   * Change the user's status
   */
  public async changeUserStatus(orgId: string, userId: string, status: 'Approved' | 'Rejected'): Promise<SomeResult<void>> {
    return this.firestore.collection('org').doc(orgId).collection('user').doc(userId).set({ status }, { merge: true })
      .then(() => makeSuccess(undefined))
      .catch((err: Error) => makeError(err.message))
  }


}