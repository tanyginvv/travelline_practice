import { readFileContent } from "./readFileContent";

interface JsonObject {
    [key: string]: validValueType;
};

type validValueType = string | number | boolean | undefined | JsonObject;

const isObject = (value: validValueType): value is JsonObject => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const compareObjectValues = (oldValue: validValueType, newValue: validValueType): JsonObject => {
    return compareObjects(oldValue as JsonObject, newValue as JsonObject);
};

const compareArrayValues = (oldValue: validValueType[], newValue: validValueType[]): Record<string, JsonObject> => {
    return oldValue.reduce<Record<string, JsonObject>>((acc, arrayItem, index) => {
        const newItem = newValue[index];
        if (Array.isArray(arrayItem) && Array.isArray(newItem)) {
            acc[index.toString()] = {
                type: 'unchanged',
                children: compareArrayValues(arrayItem, newItem)
            };
        } else if (isObject(arrayItem) && isObject(newItem)) {
            acc[index.toString()] = {
                type: 'unchanged',
                children: compareObjectValues(arrayItem, newItem)
            };
        } else {
            acc[index.toString()] = {
                type: arrayItem === newItem ? 'unchanged' : 'changed',
                oldValue: arrayItem,
                newValue: newItem
            };
        };
        return acc;
    }, {});
};

const compareObjects = (oldObj: JsonObject, newObj: JsonObject): Record<string, JsonObject> => {
    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));

    return allKeys.reduce<Record<string, JsonObject>>((acc, key) => {
        const oldValue = oldObj[key];
        const newValue = newObj[key];

        if (Array.isArray(oldValue) && Array.isArray(newValue)) {
            acc[key] = {
                type: 'unchanged',
                children: compareArrayValues(oldValue, newValue)
            };
        } else if (isObject(oldValue) && isObject(newValue)) {
                const childrenDiff = compareObjects(oldValue as JsonObject, newValue as JsonObject);
                acc[key] = {
                    type: Object.values(childrenDiff).some(child => child.type !== 'unchanged') ? 'changed' : 'unchanged',
                    children: childrenDiff
                };
        } else if (oldValue === undefined && newValue !== undefined) {
            acc[key] = {
                type: 'new',
                newValue
            };
        } else if (oldValue !== undefined && newValue === undefined) {
            acc[key] = {
                type: 'delete',
                oldValue
            };
        } else {
            const valuesChanged = oldValue !== newValue;
            acc[key] = {
                type: valuesChanged ? 'changed' : 'unchanged',
                oldValue,
                newValue
            };
        };

        return acc;
    }, {});
};

export const compareJsons = (oldJsonPath: string, newJsonPath: string) => {
    const oldJson = JSON.parse(readFileContent(oldJsonPath));
    const newJson = JSON.parse(readFileContent(newJsonPath));

    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};