import * as admin from "firebase-admin";
import { Resource } from "../model/Resource";
import { SomeResult } from "../utils/AppProviderTypes";
import DictType from "../utils/DictType";
import { User } from "../model/User";
import UserStatus from "../enums/UserStatus";
import UserType from "../enums/UserType";
import { DocumentReference } from "@google-cloud/firestore";
declare type Firestore = admin.firestore.Firestore;
export declare class UserApi {
    firestore: Firestore;
    orgId: string;
    constructor(firestore: Firestore, orgId: string);
    addFavouriteResource(userId: string, resource: Resource): Promise<SomeResult<void>>;
    removeFavouriteResource(userId: string, resourceId: string): Promise<SomeResult<void>>;
    private updateFavouriteResources;
    getFavouriteResources(userId: string): Promise<SomeResult<DictType<Resource>>>;
    getRecentResources(userId: string): Promise<SomeResult<Resource[]>>;
    /**
     * Change the user's status
     */
    changeUserStatus(userId: string, status: UserStatus.Approved | UserStatus.Rejected): Promise<SomeResult<void>>;
    changeUserType(userId: string, type: UserType): Promise<SomeResult<void>>;
    userRef(orgId: string, userId: string): DocumentReference;
    getUser(userRef: DocumentReference): Promise<SomeResult<User>>;
}
export {};
