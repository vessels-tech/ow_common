// import * as admin from "firebase-admin";
import * as admin from "firebase-admin";
import { DocumentData, DocumentSnapshot } from "@google-cloud/firestore";
import { Maybe, isUndefined } from "./Maybe";

// import { runInThisContext } from "vm";

type Firestore = admin.firestore.Firestore;

export type FirestoreDocTypes = {
  // docName: string,
  orgId: string,
  // id: string,
  // createdAt: Date,
  // updatedAt: Date,
  id: Maybe<string>
  createdAt: Maybe<Date>
  updatedAt: Maybe<Date> 
}


export class FirestoreDoc<T> {
  firestore: Firestore
  // orgId: string
  props: T & FirestoreDocTypes;
  docName: Maybe<string> = undefined;
  // id: Maybe<string> = undefined;
  // createdAt: Maybe<Date> = undefined;
  // updatedAt: Maybe<Date> = undefined;

  constructor(firestore: Firestore, orgId: string, props: T) {
    this.firestore = firestore;
    
    // this.orgId = orgId;
    // this.props = props;

    this.props = {
      ...props,
      orgId,
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    }
  }


  public create(): Promise<FirestoreDoc<T>> {
    //TODO: make sure docname isn't null;
    if (isUndefined(this.docName)) {
      throw new Error("called create() on firestoredoc, but docname is undefined.");
    }

    const newRef = this.firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc();
    this.props.id = newRef.id;
    this.props.createdAt = new Date();

    return this.save();
  }

  public save(): Promise<FirestoreDoc<T>> {
    this.props.updatedAt = new Date();

    if (isUndefined(this.props.id)) {
      throw new Error("called save() on firestoredoc, but id is undefined.");
    }

    if (isUndefined(this.docName)) {
      throw new Error("called create() on firestoredoc, but docname is undefined.");
    }
    
    return this.firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(this.props.id)
      .set(this.serialize())
      .then(ref => { return this; });
  }

  /**
   * Create docs as part of a Batch
   * Put in an id, or allow firebase to create one for you.
   */
  public batchCreate(batch: FirebaseFirestore.WriteBatch, firestore: FirebaseFirestore.Firestore, id?: string): void {
    if (isUndefined(this.docName)) {
      throw new Error("called create() on firestoredoc, but docname is undefined.");
    }

    let ref;
    if (!id) {
      ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc();
      this.props.id = ref.id;
    } else {
      ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(id);
      this.props.id = id;
    }

    this.props.createdAt = new Date();
    this.props.updatedAt = new Date();
    batch.set(ref, this.serialize());
  }

  /**
   * Delete docs as a part of a Batch
   * 
   * If no ID is provided, will use the id of the FirestoreDoc.
   */
  public batchDelete(batch: FirebaseFirestore.WriteBatch, firestore: FirebaseFirestore.Firestore, id?: string): void {
    if (isUndefined(this.docName)) {
      throw new Error("called create() on firestoredoc, but docname is undefined.");
    }

    if (isUndefined(this.props.id)) {
      throw new Error("called save() on firestoredoc, but id is undefined.");
    }

    let ref;
    if (!id) {
      ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(this.props.id);
    } else {
      ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(id);
    }
    batch.delete(ref);
  }

  //TD: this should be abstract, but TS doesn't allow for abstract methods
  public serialize(): DocumentData {
    return this.props;
    // throw new Error(`Serialize not implemented for class: ${this.docName}`);
  }

  public underlyingProps(): T {
    return this.props;
  }

  //We use U here as static superclasses can't infer the generic type T
  public static _get<U>(firestore: Firestore, docName: string, orgId: string, id: string, transform: (data: any) => U): Promise<FirestoreDoc<U>> {

    return firestore.collection('org').doc(orgId).collection(docName).doc(id).get()
      .then((sn: DocumentSnapshot) => {
        const data = sn.data();
        if (!data) {
          throw new Error(`Couldn't get model for params: ${docName}, ${orgId}, ${id}`);
        }
        const parsed: U = transform(data);
        const doc: FirestoreDoc<U> = new FirestoreDoc<U>(firestore, orgId, parsed);
        return doc;
      })
  }

}