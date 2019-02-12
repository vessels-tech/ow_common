"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreDoc_1 = require("../utils/FirestoreDoc");
const DocNames_1 = __importDefault(require("../enums/DocNames"));
class ResourceDoc extends FirestoreDoc_1.FirestoreDoc {
    static get(firestore, orgId, id) {
        const transform = (data) => {
            //Convert the different potential serialized readings into a proper AnyReading here
            return data;
        };
        return super._get(firestore, this.docName, orgId, id, transform);
    }
    static parse(data) {
        throw new Error(`Parse not implemented for class. Data is: ${data}`);
    }
}
ResourceDoc.docName = DocNames_1.default.Reading;
exports.ResourceDoc = ResourceDoc;
