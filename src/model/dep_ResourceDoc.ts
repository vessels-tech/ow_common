import { FirestoreDoc } from "../utils/FirestoreDoc";
import { Reading } from "./Reading";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";
import { Resource } from "./Resource";
import { SomeResult } from "../utils/AppProviderTypes";

export class ResourceDoc extends FirestoreDoc<Resource> {
  static docName = DocNames.Reading;

  public static get<Resource>(firestore: Firestore, orgId: string, id: string): Promise<SomeResult<FirestoreDoc<Resource>>> {
    const transform = (data: any): Resource => {
      //Convert the different potential serialized readings into a proper AnyReading here
      return data;
    }

    return super._get(firestore, this.docName, orgId, id, transform);
  }

  public static parse<U>(data: any): U {
    throw new Error(`Parse not implemented for class. Data is: ${data}`);
  }
}