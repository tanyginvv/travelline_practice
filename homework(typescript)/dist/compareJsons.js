"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareJsons = void 0;
const readFileContent_1 = require("./readFileContent");
;
const isObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};
const compareObjectValues = (oldValue, newValue) => {
    return compareObjects(oldValue, newValue);
};
const compareArrayValues = (oldValue, newValue) => {
    return oldValue.reduce((acc, arrayItem, index) => {
        const newItem = newValue[index];
        if (Array.isArray(arrayItem) && Array.isArray(newItem)) {
            acc[index.toString()] = {
                type: 'unchanged',
                children: compareArrayValues(arrayItem, newItem)
            };
        }
        else if (isObject(arrayItem) && isObject(newItem)) {
            acc[index.toString()] = {
                type: 'unchanged',
                children: compareObjectValues(arrayItem, newItem)
            };
        }
        else {
            acc[index.toString()] = {
                type: arrayItem === newItem ? 'unchanged' : 'changed',
                oldValue: arrayItem,
                newValue: newItem
            };
        }
        ;
        return acc;
    }, {});
};
const compareObjects = (oldObj, newObj) => {
    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));
    return allKeys.reduce((acc, key) => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];
        if (Array.isArray(oldValue) && Array.isArray(newValue)) {
            acc[key] = {
                type: 'unchanged',
                children: compareArrayValues(oldValue, newValue)
            };
        }
        else if (isObject(oldValue) && isObject(newValue)) {
            const childrenDiff = compareObjects(oldValue, newValue);
            acc[key] = {
                type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                children: childrenDiff
            };
        }
        else if (oldValue === undefined && newValue !== undefined) {
            acc[key] = {
                type: 'new',
                newValue
            };
        }
        else if (oldValue !== undefined && newValue === undefined) {
            acc[key] = {
                type: 'delete',
                oldValue
            };
        }
        else {
            const valuesChanged = oldValue !== newValue;
            acc[key] = {
                type: valuesChanged ? 'changed' : 'unchanged',
                oldValue,
                newValue
            };
        }
        ;
        return acc;
    }, {});
};
const compareJsons = (oldJsonPath, newJsonPath) => {
    const oldJson = JSON.parse((0, readFileContent_1.readFileContent)(oldJsonPath));
    const newJson = JSON.parse((0, readFileContent_1.readFileContent)(newJsonPath));
    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};
exports.compareJsons = compareJsons;
