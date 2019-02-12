import * as admin from "firebase-admin";
import { Maybe } from "../utils/Maybe";
declare type Firestore = admin.firestore.Firestore;
declare let firestore: Maybe<Firestore>;
declare const auth: admin.auth.Auth;
export { admin, auth, firestore };
