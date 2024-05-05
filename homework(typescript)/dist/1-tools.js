"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { program } = require('commander');
const htmlParser_1 = require("./htmlParser");
const compareJsons_1 = require("./compareJsons");
const readFileContent_1 = require("./readFileContent");
program
    .command('html-resources <path>')
    .description('Helps to find sources in Html document')
    .action((path) => (0, htmlParser_1.parserForHtml)(path)),
    program
        .command('json-diff <oldJson> <newJson>')
        .description('Compares two JSON files and shows the differences')
        .action((oldJsonPath, newJsonPath) => {
        const oldJsonContent = (0, readFileContent_1.readFileContent)(oldJsonPath);
        const newJsonContent = (0, readFileContent_1.readFileContent)(newJsonPath);
        const diff = (0, compareJsons_1.compareJsons)(oldJsonContent, newJsonContent);
        console.log(JSON.stringify(diff, null, 2));
    });
program.parse(process.argv);
