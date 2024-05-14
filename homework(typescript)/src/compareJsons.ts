const fs = require('fs');
interface JSON {
    [key: string]: ValidType;
};

type ValidType = string | number | boolean | JSON | undefined;

const isObject = (value: ValidType): value is JSON => {
    return typeof value === 'object' && value !== undefined && !Array.isArray(value);
};

const compareObjects = (oldObj: Record<string, JSON>, newObj: Record<string, JSON>): Record<string, JSON> => {
    const allKeys: string[] =  [...Object.keys(oldObj), ...Object.keys(newObj)];

    return allKeys.reduce((result: Record<string, JSON>, key: string) => {
        const oldValue: JSON = oldObj[key];
        const newValue: JSON = newObj[key];

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
                    children: compareObjects(oldValue as Record<string,JSON>, newValue as Record<string,JSON>)
                }
            };
        };

        if (isObject(oldValue) && isObject(newValue)) {
            const childrenDiff = compareObjects(oldValue as Record<string,JSON>, newValue as Record<string,JSON>);
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

export const compareJsons = async (oldJsonPath: string, newJsonPath: string) => {
    const oldJson: Record<string, JSON> = await JSON.parse(fs.readFileSync(oldJsonPath, 'utf-8'));
    const newJson: Record<string, JSON> = await JSON.parse(fs.readFileSync(newJsonPath, 'utf-8'));

    const diff = compareObjects(oldJson, newJson);
    console.log(JSON.stringify(diff, null, 2));
};