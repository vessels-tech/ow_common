/**
 * FirebaseApi is the iterface with which to interact
 * with firebase in any way.
 */


//TODO: How do we have a generic firestore type?

import * as admin from "firebase-admin";
import ResourceType from "../enums/ResourceType";
import { SomeResult } from "../utils/AppProviderTypes";
type Firestore = admin.firestore.Firestore;

class FirebaseApi {
  firestore: Firestore;
  orgId: string;

  constructor(firestore: any, orgId: string) {
    this.firestore = firestore;
    this.orgId = orgId;

  }


  //
  // User
  // ------------------------------------

  public addFavouriteResource(userId: string, resource: Resource): Promise<SomeResult<void>> {
    //TODO implement
  }

  public removeFavouriteResource(userId: string, resourceId: string) {

  }

  private updateFavouriteResources(userId: string, favouriteResources: Resouce[]) {

  }

  private getFavouriteResources(userId: string): Promise<SomeResult<Resource[]>> {

  }

  public getRecentResources(userId: string): Promise<SomeResult<Resource[]>> {

  }

  public addRecentResource(userId: string, resource: Resource): Promise<SomeResult<Resource[]>> {
    
  }



}