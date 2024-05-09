const fs = require('fs');
const htmlParser = require('node-html-parser');
const sourceTags = 'link[href], a[href], img[src], script[src]';

const parseFile = async (filePath: string): Promise<string> => {
    const data = await readFile(filePath, 'utf-8');
    return data;
};

const readFile = async (filePath: string, encoding: string): Promise<string> => {
    const data = await fs.promises.readFile(filePath, encoding);
    return data;
};

const extractLinks = (root: Element): string[] => {
    const links = root.querySelectorAll(sourceTags);

    const uniqueLinks = Array.from(links).reduce<string[]>((acc, link) => {
        const href = link.getAttribute('href') || link.getAttribute('src');
        if (href && !acc.includes(href)) {
            acc.push(href);
        };
        return acc;
    }, []);
    
    return uniqueLinks;  
};

const printLinks = (uniqueLinks: string[]) => {
    console.log("[");
    uniqueLinks.forEach((link: string) => {
        console.log(`  ${link}`);
    });
    console.log("]");
};

export const parserForHtml = async (filePath: string) => {
    const data: string = await parseFile(filePath);
    const root: Element = htmlParser.parse(data);
    const uniqueLinks = extractLinks(root);
    printLinks(uniqueLinks);     
};