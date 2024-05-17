const fs = require('fs');
type JsonObject = Record<string, unknown>;

type Result = Record<string, {
    type: `unchanged` | `new` | `changed` | `delete`,
    newValue?: unknown,
    oldValue?: unknown,
    children?: Result
}>;

const isObject = (value: unknown): value is JsonObject => {
    return typeof value === 'object' && value !== null;
};
const compareObjects = (oldObj: JsonObject, newObj: JsonObject): Result => {
    const allKeys: string[] =  [...Object.keys(oldObj), ...Object.keys(newObj)];

    return allKeys.reduce<Result>((result, key)  => {
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

export const compareJsonsResult = async (oldJsonPath: string, newJsonPath: string) => {
    const oldJson: JsonObject = await JSON.parse(fs.readFileSync(oldJsonPath, 'utf-8'));
    const newJson: JsonObject = await JSON.parse(fs.readFileSync(newJsonPath, 'utf-8'));

    return compareObjects(oldJson, newJson);
};