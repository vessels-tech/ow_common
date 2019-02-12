import { FirestoreDoc } from "../utils/FirestoreDoc";
import DocNames from "../enums/DocNames";
import { Firestore } from "@google-cloud/firestore";
import { Resource } from "./Resource";
import { SomeResult } from "../utils/AppProviderTypes";
export declare class ResourceDoc extends FirestoreDoc<Resource> {
    static docName: DocNames;
    static get<Resource>(firestore: Firestore, orgId: string, id: string): Promise<SomeResult<FirestoreDoc<Resource>>>;
    static parse<U>(data: any): U;
}
