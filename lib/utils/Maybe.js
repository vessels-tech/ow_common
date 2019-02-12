"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isDefined(x) {
    return x !== undefined && x !== null;
}
exports.isDefined = isDefined;
function isUndefined(x) {
    return x === undefined || x === null;
}
exports.isUndefined = isUndefined;
function getOrElse(x, defaultValue) {
    return isDefined(x) ? x : defaultValue;
}
exports.getOrElse = getOrElse;
