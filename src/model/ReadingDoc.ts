import { FirestoreDoc } from "../utils/FirestoreDoc";
import { Reading } from "./Reading";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";
import { SomeResult } from "../utils/AppProviderTypes";

export class ReadingDoc extends FirestoreDoc<Reading> {
  static docName = DocNames.Reading;

  public static get<Reading>(firestore: Firestore, orgId: string, id: string): Promise<SomeResult<FirestoreDoc<Reading>>> {
    const transform = (data: any): Reading => {
      //Convert the different potential serialized readings into a proper AnyReading here
      return data;
    }

    return super._get(firestore, this.docName, orgId, id, transform);
  }

  public static parse<U>(data: any): U {
    throw new Error(`Parse not implemented for class. Data is: ${data}`);
  }
}