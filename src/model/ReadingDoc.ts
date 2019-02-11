import { FirestoreDoc } from "../utils/FirestoreDoc";
import { AnyReading } from "./Reading";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";

export class ReadingDoc extends FirestoreDoc<AnyReading> {
  static docName = DocNames.Reading;

  public static get<AnyReading>(firestore: Firestore, orgId: string, id: string): Promise<FirestoreDoc<AnyReading>> {
    const transform = (data: any): AnyReading => {
      //Convert the different potential serialized readings into a proper AnyReading here

      return data;
    }

    return super._get(firestore, this.docName, orgId, id, transform);
  }

  public static parse<U>(data: any): U {
    throw new Error(`Parse not implemented for class. Data is: ${data}`);
  }
}