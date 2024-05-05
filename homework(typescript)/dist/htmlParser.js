"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserForHtml = void 0;
const fs = require('fs');
const htmlParser = require('node-html-parser');
const sourceTags = 'link[href], a[href], img[src], script[src]';
const parserForHtml = (filePath) => {
    try {
        fs.access(filePath, fs.constants.F_OK, (error) => {
            if (error) {
                console.error(`${filePath} not found`);
                return;
            }
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    console.error(`${filePath} Read file error`);
                    return;
                }
                const root = htmlParser.parse(data);
                const links = root.querySelectorAll(sourceTags);
                const uniqueLinks = new Set();
                links.forEach((link) => {
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
            });
        });
    }
    catch (error) {
        console.error(error);
        return;
    }
};
exports.parserForHtml = parserForHtml;
