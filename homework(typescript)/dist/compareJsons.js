"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareJsons = void 0;
const readFileContent_1 = require("./readFileContent");
;
const isObject = (value) => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};
const compareObjectValues = (oldValue, newValue) => isObject(oldValue) && isObject(newValue) ? compareObjects(oldValue, newValue) : {};
const compareArrayValues = (oldValue, newValue) => {
    return oldValue.map((arrayItem, index) => {
        const newItem = newValue[index];
        if (Array.isArray(arrayItem) && Array.isArray(newItem)) {
            return {
                [index.toString()]: {
                    type: 'unchanged',
                    children: compareArrayValues(arrayItem, newItem)
                }
            };
        }
        else if (isObject(arrayItem) && isObject(newItem)) {
            return {
                [index.toString()]: {
                    type: 'unchanged',
                    children: compareObjectValues(arrayItem, newItem)
                }
            };
        }
        else {
            return {
                [index.toString()]: {
                    type: arrayItem === newItem ? 'unchanged' : 'changed',
                    oldValue: arrayItem,
                    newValue: newItem
                }
            };
        }
    }).reduce((acc, obj) => Object.assign(Object.assign(Object.assign({}, acc), obj)), {});
};
const compareObjects = (oldObj, newObj) => {
    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));
    return allKeys.map(key => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];
        if (Array.isArray(oldValue) && Array.isArray(newValue)) {
            return {
                [key]: {
                    type: 'unchanged',
                    children: compareArrayValues(oldValue, newValue)
                }
            };
        }
        else if (isObject(oldValue) && isObject(newValue)) {
            const childrenDiff = compareObjects(oldValue, newValue);
            return {
                [key]: {
                    type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                    children: childrenDiff
                }
            };
        }
        else if (oldValue === undefined && newValue !== undefined) {
            return {
                [key]: {
                    type: 'new',
                    newValue
                }
            };
        }
        else if (oldValue !== undefined && newValue === undefined) {
            return {
                [key]: {
                    type: 'delete',
                    oldValue
                }
            };
        }
        else {
            const valuesChanged = oldValue !== newValue;
            return {
                [key]: {
                    type: valuesChanged ? 'changed' : 'unchanged',
                    oldValue,
                    newValue
                }
            };
        }
    }).reduce((acc, obj) => Object.assign(Object.assign(Object.assign({}, acc), obj)), {});
};
const compareJsons = (oldJsonPath, newJsonPath) => {
    const oldJson = JSON.parse((0, readFileContent_1.readFileContent)(oldJsonPath));
    const newJson = JSON.parse((0, readFileContent_1.readFileContent)(newJsonPath));
    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};
exports.compareJsons = compareJsons;
