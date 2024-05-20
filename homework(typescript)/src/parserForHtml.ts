const fs = require('fs');
const htmlParser = require('node-html-parser');
const sourceTags = 'link[href], a[href], img[src], script[src]';

const extractLinks = (root: Element): string[] => {
    const links = root.querySelectorAll(sourceTags);

    const uniqueLinks = Array.from(links).reduce<string[]>((acc, link) => {
        const href = link.getAttribute('href') || link.getAttribute('src');
        return href && !acc.includes(href) ? [...acc, href] : acc;
    }, []);
    
    return uniqueLinks;  
};

export const parserForHtmlResult = async (filePath: string) : Promise<string[]> => {
    const data: string = await fs.readFileSync(filePath, 'utf-8');;
    const root: Element = htmlParser.parse(data);
    return extractLinks(root);    
};