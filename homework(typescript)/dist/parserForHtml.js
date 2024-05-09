"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserForHtml = void 0;
const fs = require('fs');
const htmlParser = require('node-html-parser');
const sourceTags = 'link[href], a[href], img[src], script[src]';
const parseFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield readFile(filePath, 'utf-8');
    return data;
});
const readFile = (filePath, encoding) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fs.promises.readFile(filePath, encoding);
    return data;
});
const extractLinks = (root) => {
    const links = root.querySelectorAll(sourceTags);
    const uniqueLinks = Array.from(links).reduce((acc, link) => {
        const href = link.getAttribute('href') || link.getAttribute('src');
        if (href && !acc.includes(href)) {
            acc.push(href);
        }
        ;
        return acc;
    }, []);
    return uniqueLinks;
};
const printLinks = (uniqueLinks) => {
    console.log("[");
    uniqueLinks.forEach((link) => {
        console.log(`  ${link}`);
    });
    console.log("]");
};
const parserForHtml = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield parseFile(filePath);
    const root = htmlParser.parse(data);
    const uniqueLinks = extractLinks(root);
    printLinks(uniqueLinks);
});
exports.parserForHtml = parserForHtml;
