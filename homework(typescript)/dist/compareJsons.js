"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareJsons = void 0;
const readFileContent_1 = require("./readFileContent");
;
const isObject = (value) => {
    return typeof value === 'object' && value !== undefined && !Array.isArray(value);
};
const compareObjectValues = (oldValue, newValue) => isObject(oldValue) && isObject(newValue) ? compareObjects(oldValue, newValue) : {};
const compareArrayValues = (oldValue, newValue) => {
    return oldValue.reduce((result, arrayItem, index) => {
        const newItem = newValue[index];
        if (Array.isArray(arrayItem) && Array.isArray(newItem)) {
            return Object.assign(Object.assign({}, result), { [index.toString()]: {
                    type: 'unchanged',
                    children: compareArrayValues(arrayItem, newItem)
                } });
        }
        ;
        if (isObject(arrayItem) && isObject(newItem)) {
            return Object.assign(Object.assign({}, result), { [index.toString()]: {
                    type: 'unchanged',
                    children: compareObjectValues(arrayItem, newItem)
                } });
        }
        ;
        return Object.assign(Object.assign({}, result), { [index.toString()]: {
                type: arrayItem === newItem ? 'unchanged' : 'changed',
                oldValue: arrayItem,
                newValue: newItem
            } });
    }, {});
};
const compareObjects = (oldObj, newObj) => {
    const allKeys = Array.from(([...Object.keys(oldObj), ...Object.keys(newObj)]));
    return allKeys.reduce((result, key) => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];
        if (!(key in newObj)) {
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: 'delete',
                    oldValue
                } });
        }
        ;
        if (!(key in oldObj)) {
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: 'new',
                    newValue
                } });
        }
        ;
        if (Array.isArray(oldValue) && Array.isArray(newValue)) {
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: 'unchanged',
                    children: compareArrayValues(oldValue, newValue)
                } });
        }
        ;
        if (isObject(oldValue) && isObject(newValue)) {
            const childrenDiff = compareObjects(oldValue, newValue);
            return Object.assign(Object.assign({}, result), { [key]: {
                    type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                    children: childrenDiff
                } });
        }
        ;
        return Object.assign(Object.assign({}, result), { [key]: {
                type: oldValue === newValue ? 'unchanged' : 'changed',
                oldValue,
                newValue
            } });
    }, {});
};
const compareJsons = (oldJsonPath, newJsonPath) => {
    const oldJson = JSON.parse((0, readFileContent_1.readFileContent)(oldJsonPath));
    const newJson = JSON.parse((0, readFileContent_1.readFileContent)(newJsonPath));
    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};
exports.compareJsons = compareJsons;
