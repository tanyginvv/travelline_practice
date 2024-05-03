const {program} = require('commander');
const fs = require('fs');
const htmlParser = require('node-html-parser');
const sourceTags = 'link[href], a[href], img[src], script[src]';

const parserForHtml = (filePath: string) => {
    try {
        fs.access(filePath, fs.constants.F_OK, (error: string) => {
            if (error) {
                console.error(`${filePath} not found`);
                return;
            }

            fs.readFile(filePath, 'utf-8', (err: string, data: string) => {
                if (err) {
                    console.error(`${filePath} Read file error`);
                    return;
                }

                const root = htmlParser.parse(data);
                const links = root.querySelectorAll(sourceTags);

                const uniqueLinks = new Set();

                links.forEach((link: Element) => {
                    const href = link.getAttribute('href') || link.getAttribute('src');
                    if (href) {
                        uniqueLinks.add(href);
                    }
                });

                console.log("[");
                uniqueLinks.forEach((link) => {
                    console.log(`  ${link}`);
                });
                console.log("]");
            })
        })
    } catch (error) {
        console.error(error);
        return;
    }
}

const readFileContent = (filePath: string) => {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return;
    }
}

interface JsonObject {
    [key: string]: string | number | boolean | undefined | JsonObject ;
}

const compareJsons = (oldJsonContent: string, newJsonContent: string) => {
    try {
        const oldJson = JSON.parse(oldJsonContent);
        const newJson = JSON.parse(newJsonContent);

        const compareObjects = (oldObj: JsonObject, newObj: JsonObject): JsonObject => {
            const nestedDiff: Record<string, JsonObject> = {};

            const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));
            allKeys.forEach(key => {
                const oldValue = oldObj[key];
                const newValue = newObj[key];
                
                if (typeof oldValue === 'object' && typeof newValue === 'object' && oldValue !== undefined && newValue !== undefined) {
                    const childrenDiff = compareObjects(oldValue, newValue);
                    if (Object.values(childrenDiff).some(child => (child as JsonObject).type !== 'unchanged')) {
                        nestedDiff[key] = {
                            type: 'changed',
                            children: childrenDiff
                        };
                    } else {
                        nestedDiff[key] = {
                            type: 'unchanged',
                            children: childrenDiff
                        };
                    }
                } else {
                    if (oldValue === newValue) {
                        nestedDiff[key] = {
                            type: 'unchanged',
                            oldValue,
                            newValue
                        };
                    } else {
                        nestedDiff[key] = {
                            type: 'changed',
                            oldValue,
                            newValue
                        };
                    }
                }
            });

            Object.keys(newObj).forEach(key => {
                if (!(key in oldObj)) {
                    nestedDiff[key] = {
                        type: 'new',
                        newValue: newObj[key]
                    };
                }
            });
        
            Object.keys(oldObj).forEach(key => {
                if (!(key in newObj)) {
                    nestedDiff[key] = {
                        type: 'delete',
                        oldValue: oldObj[key]
                    };
                }
            });

            return nestedDiff;
        };

        return compareObjects(oldJson, newJson);
    } catch (error) {
        console.error('Error comparing JSON files:', error);
    }
}

program
  .command('html-resources <path>')
  .description('Helps to find sources in Html document')
  .action((path:string) => parserForHtml(path)),

program
  .command('json-diff <oldJson> <newJson>')
  .description('Compares two JSON files and shows the differences')
  .action((oldJsonPath:string, newJsonPath:string) => {
    const oldJsonContent = readFileContent(oldJsonPath);
    const newJsonContent = readFileContent(newJsonPath);
    const diff = compareJsons(oldJsonContent, newJsonContent);
    console.log(JSON.stringify(diff, null, 2));
  })

program.parse(process.argv)