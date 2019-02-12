"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ow_translations_1 = require("ow_translations");
const UserStatus_1 = __importDefault(require("../enums/UserStatus"));
const UserType_1 = __importDefault(require("../enums/UserType"));
exports.DefaultUser = {
    id: 'no_user_id',
    favouriteResources: {},
    pendingSavedReadings: [],
    pendingSavedResources: [],
    recentResources: [],
    recentSearches: [],
    status: UserStatus_1.default.Unapproved,
    translation: ow_translations_1.TranslationEnum.en_AU,
    type: UserType_1.default.User,
};
