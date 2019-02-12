import { FirestoreDoc } from "../utils/FirestoreDoc";
import { Reading } from "./Reading";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";
import { Resource } from "./Resource";
import { User, DefaultUser } from './User';
import { SomeResult } from "../utils/AppProviderTypes";

export class UserDoc extends FirestoreDoc<Resource> {
  static docName = DocNames.Reading;

  public static get<User>(firestore: Firestore, orgId: string, id: string): Promise<SomeResult<FirestoreDoc<User>>> {
    const transform = (data: any): User => {
      //Convert the serialized data into a user object. 
      //Sets the default user in case one hasn't been set.
      return {
        ...DefaultUser,
        ...data,
      }
    }

    return super._get(firestore, this.docName, orgId, id, transform);
  }

  public static parse<U>(data: any): U {
    throw new Error(`Parse not implemented for class. Data is: ${data}`);
  }
}