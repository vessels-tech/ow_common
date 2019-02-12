import { FirestoreDoc } from "../utils/FirestoreDoc";
import { Reading } from "./Reading";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";
import { SomeResult } from "../utils/AppProviderTypes";
export declare class ReadingDoc extends FirestoreDoc<Reading> {
    static docName: DocNames;
    static get<Reading>(firestore: Firestore, orgId: string, id: string): Promise<SomeResult<FirestoreDoc<Reading>>>;
    static parse<U>(data: any): U;
}
