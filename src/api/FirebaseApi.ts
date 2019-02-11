/**
 * FirebaseApi is the iterface with which to interact
 * with firebase in any way.
 */


//TODO: How do we have a generic firestore type?

import * as admin from "firebase-admin";
import ResourceType from "../enums/ResourceStationType";
import { SomeResult, ResultType, makeSuccess } from "../utils/AppProviderTypes";
import { Resource } from "../model/Resource";
import { FirestoreDoc } from "../utils/FirestoreDoc";
import { User } from "../model/User";
import { UserDoc } from "../model/UserDoc";
import DictType from "../utils/DictType";
type Firestore = admin.firestore.Firestore;

class FirebaseApi {
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

  public async removeFavouriteResource(userId: string, resourceId: string): Promise<SomeResult<void>>   {
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


}

export default FirebaseApi;