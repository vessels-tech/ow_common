"use strict";
/**
 * FirestoreDoc
 *
 * This is a second pass at a kind of ORM for Firestore.
 * It has many issues, and so shouldn't be used as of yet,
 * but can hopefully inform future work in this area.
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Maybe_1 = require("./Maybe");
const AppProviderTypes_1 = require("./AppProviderTypes");
class FirestoreDoc {
    constructor(firestore, orgId, props) {
        this.docName = undefined;
        this.firestore = firestore;
        this.props = {
            ...props,
            orgId,
            id: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };
    }
    create() {
        if (Maybe_1.isUndefined(this.docName)) {
            throw new Error("called create() on firestoredoc, but docname is undefined.");
        }
        const newRef = this.firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc();
        this.props.id = newRef.id;
        this.props.createdAt = new Date();
        return this.save();
    }
    save(options) {
        this.props.updatedAt = new Date();
        if (Maybe_1.isUndefined(this.props.id)) {
            throw new Error("called save() on firestoredoc, but id is undefined.");
        }
        if (Maybe_1.isUndefined(this.docName)) {
            throw new Error("called create() on firestoredoc, but docname is undefined.");
        }
        return this.firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(this.props.id)
            .set(this.serialize(), options)
            .then(ref => AppProviderTypes_1.makeSuccess(this))
            .catch((err) => AppProviderTypes_1.makeError(err.message));
    }
    /**
     * Create docs as part of a Batch
     * Put in an id, or allow firebase to create one for you.
     */
    batchCreate(batch, firestore, id) {
        if (Maybe_1.isUndefined(this.docName)) {
            throw new Error("called create() on firestoredoc, but docname is undefined.");
        }
        let ref;
        if (!id) {
            ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc();
            this.props.id = ref.id;
        }
        else {
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
    batchDelete(batch, firestore, id) {
        if (Maybe_1.isUndefined(this.docName)) {
            throw new Error("called create() on firestoredoc, but docname is undefined.");
        }
        if (Maybe_1.isUndefined(this.props.id)) {
            throw new Error("called save() on firestoredoc, but id is undefined.");
        }
        let ref;
        if (!id) {
            ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(this.props.id);
        }
        else {
            ref = firestore.collection('org').doc(this.props.orgId).collection(this.docName).doc(id);
        }
        batch.delete(ref);
    }
    serialize() {
        return this.props;
    }
    underlyingProps() {
        return this.props;
    }
    //We use U here as static superclasses can't infer the generic type T
    static _get(firestore, docName, orgId, id, transform) {
        return firestore.collection('org').doc(orgId).collection(docName).doc(id).get()
            .then((sn) => {
            const data = sn.data();
            if (!data) {
                throw new Error(`Couldn't get model for params: ${docName}, ${orgId}, ${id}`);
            }
            const parsed = transform(data);
            const doc = new FirestoreDoc(firestore, orgId, parsed);
            return AppProviderTypes_1.makeSuccess(doc);
        })
            .catch((err) => AppProviderTypes_1.makeError(err.message));
    }
}
exports.FirestoreDoc = FirestoreDoc;
