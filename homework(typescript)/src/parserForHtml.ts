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

const extractLinks = (root: Element): Set<string> => {
    const links = root.querySelectorAll(sourceTags);

    const uniqueLinks = new Set([...links].map(link => 
        link.getAttribute('href') || link.getAttribute('src') || '')
        .filter(href => href !== ''));
    return uniqueLinks; 
};

const printLinks = (uniqueLinks: Set<string>) => {
    console.log("[");
    uniqueLinks.forEach((link: string) => {
        console.log(`  ${link}`);
    });
    console.log("]");
};

export const parserForHtml = async (filePath: string) => {
    const data = await parseFile(filePath);
    const root = htmlParser.parse(data);
    const uniqueLinks = extractLinks(root);
    printLinks(uniqueLinks);     
};