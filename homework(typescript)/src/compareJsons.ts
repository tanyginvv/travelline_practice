import { readFileContent } from "./readFileContent";

interface Object {
    [key: string]: ValidType;
};

type ValidType = string | number | boolean | undefined | Object;

const isObject = (value: ValidType): value is Object => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const compareObjectValues = (oldValue: ValidType, newValue: ValidType): Object =>
    isObject(oldValue) && isObject(newValue) ? compareObjects(oldValue as Object, newValue as Object) : {};

const compareArrayValues = (oldValue: ValidType[], newValue: ValidType[]): Record<string, Object> => {
    return oldValue.map((arrayItem, index) => {
        const newItem = newValue[index];
        if (Array.isArray(arrayItem) && Array.isArray(newItem)) {
            return {
                [index.toString()]: {
                    type: 'unchanged',
                    children: compareArrayValues(arrayItem, newItem)
                }
            };
        } else if (isObject(arrayItem) && isObject(newItem)) {
            return {
                [index.toString()]: {
                    type: 'unchanged',
                    children: compareObjectValues(arrayItem, newItem)
                }
            };
        } else {
            return {
                [index.toString()]: {
                    type: arrayItem === newItem ? 'unchanged' : 'changed',
                    oldValue: arrayItem,
                    newValue: newItem
                }
            };
        }
    }).reduce((acc, obj) => Object.assign({ ...acc, ...obj }), {});
};

const compareObjects = (oldObj: Object, newObj: Object): Record<string, Object> => {
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
        } else if (isObject(oldValue) && isObject(newValue)) {
                const childrenDiff = compareObjects(oldValue as Object, newValue as Object);
                return {
                    [key]: {
                        type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                        children: childrenDiff
                    }
                };
        } else if (oldValue === undefined && newValue !== undefined) {
            return {
                [key]: {
                    type: 'new',
                    newValue
                }
            };
        } else if (oldValue !== undefined && newValue === undefined) {
            return {
                [key]: {
                    type: 'delete',
                    oldValue
                }
            };
        } else {
            const valuesChanged = oldValue !== newValue;
            return {
                [key]: {
                    type: valuesChanged ? 'changed' : 'unchanged',
                    oldValue,
                    newValue
                }
            };
        }
    }).reduce((acc, obj) => Object.assign({ ...acc, ...obj }), {});
};

export const compareJsons = (oldJsonPath: string, newJsonPath: string) => {
    const oldJson: Object = JSON.parse(readFileContent(oldJsonPath));
    const newJson: Object = JSON.parse(readFileContent(newJsonPath));

    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};