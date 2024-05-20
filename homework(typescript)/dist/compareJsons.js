"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareJsonsResult = void 0;
const fs = require('fs');
const isObject = (value) => {
    return typeof value === 'object' && value !== null;
};
const compareObjects = (oldObj, newObj) => {
    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));
    return allKeys.reduce((result, key) => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];
        if (!(key in newObj)) {
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: 'delete',
                    oldValue
                } });
        }
        if (!(key in oldObj)) {
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: 'new',
                    newValue
                } });
        }
        if (isObject(oldValue) && isObject(newValue)) {
            const childrenDiff = compareObjects(oldValue, newValue);
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                    children: childrenDiff
                } });
        }
        return Object.assign(Object.assign({}, result), { [key]: {
                type: oldValue === newValue ? 'unchanged' : 'changed',
                oldValue,
                newValue
            } });
    }, {});
};
const compareJsonsResult = (oldJsonPath, newJsonPath) => __awaiter(void 0, void 0, void 0, function* () {
    const oldJson = JSON.parse(yield fs.promises.readFile(oldJsonPath, 'utf-8'));
    const newJson = JSON.parse(yield fs.promises.readFile(newJsonPath, 'utf-8'));
    return compareObjects(oldJson, newJson);
});
exports.compareJsonsResult = compareJsonsResult;
