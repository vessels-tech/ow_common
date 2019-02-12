"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FirestoreDoc_1 = require("../utils/FirestoreDoc");
const DocNames_1 = __importDefault(require("../enums/DocNames"));
const User_1 = require("./User");
class UserDoc extends FirestoreDoc_1.FirestoreDoc {
    static get(firestore, orgId, id) {
        const transform = (data) => {
            //Convert the serialized data into a user object. 
            //Sets the default user in case one hasn't been set.
            return {
                ...User_1.DefaultUser,
                ...data,
            };
        };
        return super._get(firestore, this.docName, orgId, id, transform);
    }
    static parse(data) {
        throw new Error(`Parse not implemented for class. Data is: ${data}`);
    }
}
UserDoc.docName = DocNames_1.default.Reading;
exports.UserDoc = UserDoc;
