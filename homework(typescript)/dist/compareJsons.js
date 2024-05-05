"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareJsons = void 0;
;
const compareJsons = (oldJsonContent, newJsonContent) => {
    try {
        const oldJson = JSON.parse(oldJsonContent);
        const newJson = JSON.parse(newJsonContent);
        const compareObjects = (oldObj, newObj) => {
            const nestedDiff = {};
            const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));
            allKeys.forEach(key => {
                const oldValue = oldObj[key];
                const newValue = newObj[key];
                if (typeof oldValue === 'object' && typeof newValue === 'object' && oldValue !== undefined && newValue !== undefined) {
                    const childrenDiff = compareObjects(oldValue, newValue);
                    if (Object.values(childrenDiff).some(child => child.type !== 'unchanged')) {
                        nestedDiff[key] = {
                            type: 'changed',
                            children: childrenDiff
                        };
                    }
                    else {
                        nestedDiff[key] = {
                            type: 'unchanged',
                            children: childrenDiff
                        };
                    }
                    ;
                }
                else {
                    if (oldValue === newValue) {
                        nestedDiff[key] = {
                            type: 'unchanged',
                            oldValue,
                            newValue
                        };
                    }
                    else {
                        nestedDiff[key] = {
                            type: 'changed',
                            oldValue,
                            newValue
                        };
                    }
                    ;
                }
                ;
            });
            Object.keys(newObj).forEach(key => {
                if (!(key in oldObj)) {
                    nestedDiff[key] = {
                        type: 'new',
                        newValue: newObj[key]
                    };
                }
                ;
            });
            Object.keys(oldObj).forEach(key => {
                if (!(key in newObj)) {
                    nestedDiff[key] = {
                        type: 'delete',
                        oldValue: oldObj[key]
                    };
                }
                ;
            });
            return nestedDiff;
        };
        return compareObjects(oldJson, newJson);
    }
    catch (error) {
        console.error('Error comparing JSON files:', error);
    }
    ;
};
exports.compareJsons = compareJsons;
