import { FirestoreDoc } from "../utils/FirestoreDoc";
import DocNames from "../enums/DocNames";
import { ShortId } from './ShortId';
import { Firestore } from "@google-cloud/firestore";
export declare class ShortIdDoc extends FirestoreDoc<ShortId> {
    static docName: DocNames;
    static get<ShortId>(firestore: Firestore, orgId: string, id: string): Promise<FirestoreDoc<ShortId>>;
    static parse<U>(data: any): U;
}
