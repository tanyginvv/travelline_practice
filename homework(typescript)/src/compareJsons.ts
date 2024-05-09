import { readFileContent } from "./readFileContent";

interface JSON {
    [key: string]: ValidType;
};

type ValidType = string | number | boolean | JSON | undefined;

const isObject = (value: ValidType): value is JSON => {
    return typeof value === 'object' && value !== undefined && !Array.isArray(value);
};

const compareObjectValues = (oldValue: ValidType, newValue: ValidType): JSON =>
    isObject(oldValue) && isObject(newValue) ? compareObjects(oldValue, newValue) : {};

const compareArrayValues = (oldValue: ValidType[], newValue: ValidType[]): Record<string, JSON> => {
    return oldValue.reduce((result: Record<string, JSON>, arrayItem: ValidType, index: number) => {
        const newItem = newValue[index];

        if (Array.isArray(arrayItem) && Array.isArray(newItem)) {
            return {
                ...result,
                [index.toString()]: {
                    type: 'unchanged',
                    children: compareArrayValues(arrayItem, newItem)
                }
            };
        };
        if (isObject(arrayItem) && isObject(newItem)) {
            return {
                ...result,
                [index.toString()]: {
                    type: 'unchanged',
                    children: compareObjectValues(arrayItem, newItem)
                }
            };
        };
        return {
            ...result,
            [index.toString()]: {
                type: arrayItem === newItem ? 'unchanged' : 'changed',
                oldValue: arrayItem,
                newValue: newItem
            }
        };
    }, {});
};

const compareObjects = (oldObj: JSON, newObj: JSON): Record<string, JSON> => {
    const allKeys: string[] =  Array.from(([...Object.keys(oldObj), ...Object.keys(newObj)]))

    return allKeys.reduce((result: Record<string, JSON>, key: string) => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];

        if (!(key in newObj)) {
            return {
                ...result,
                [key]: {
                    type: 'delete',
                    oldValue
                }
            };
        };       

        if (!(key in oldObj)) {
            return {
                ...result,
                [key]: {
                    type: 'new',
                    newValue
                }
            };
        }; 

        if (Array.isArray(oldValue) && Array.isArray(newValue)) {
            return {
                ...result,
                [key]: {
                    type: 'unchanged',
                    children: compareArrayValues(oldValue, newValue)
                }
            };
        };
        if (isObject(oldValue) && isObject(newValue)) {
            const childrenDiff = compareObjects(oldValue, newValue);
            return {
                ...result,
                [key]: {
                    type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                    children: childrenDiff
                }
            };
        };

        return {
            ...result,
            [key]: {
                type: oldValue === newValue ? 'unchanged' : 'changed',
                oldValue,
                newValue
            }
        };
    }, {});
};

export const compareJsons = (oldJsonPath: string, newJsonPath: string) => {
    const oldJson: JSON = JSON.parse(readFileContent(oldJsonPath));
    const newJson: JSON = JSON.parse(readFileContent(newJsonPath));

    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};