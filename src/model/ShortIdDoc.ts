
import { FirestoreDoc } from "../utils/FirestoreDoc";
import DocNames from "../enums/DocNames";
import { ShortId } from './ShortId';
import { Firestore } from "@google-cloud/firestore";

export class ShortIdDoc extends FirestoreDoc<ShortId> {
  static docName = DocNames.ShortId;

  public static get<ShortId>(firestore: Firestore, orgId: string, id: string): Promise<FirestoreDoc<ShortId>> {
    const transform = (data: any): ShortId => {
      //Convert the different potential serialized readings into a proper AnyReading here
      return data;
    }

    return super._get(firestore, this.docName, orgId, id, transform);
  }

  public static parse<U>(data: any): U {
    throw new Error(`Parse not implemented for class. Data is: ${data}`);
  }
}