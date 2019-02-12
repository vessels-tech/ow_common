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
import { UserDoc } from "../model/dep_UserDoc";
import DictType from "../utils/DictType";
type Firestore = admin.firestore.Firestore;

class FirebaseApi {
  firestore: Firestore;
  orgId: string;

  constructor(firestore: Firestore, orgId: string) {
    this.firestore = firestore;
    this.orgId = orgId;

  }


  


}

export default FirebaseApi;