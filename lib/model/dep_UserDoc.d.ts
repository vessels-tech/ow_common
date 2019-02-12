import { FirestoreDoc } from "../utils/FirestoreDoc";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";
import { Resource } from "./Resource";
import { SomeResult } from "../utils/AppProviderTypes";
export declare class UserDoc extends FirestoreDoc<Resource> {
    static docName: DocNames;
    static get<User>(firestore: Firestore, orgId: string, id: string): Promise<SomeResult<FirestoreDoc<User>>>;
    static parse<U>(data: any): U;
}
