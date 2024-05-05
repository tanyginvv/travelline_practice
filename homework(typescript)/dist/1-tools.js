"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { program } = require('commander');
const parserForHtml_1 = require("./parserForHtml");
const compareJsons_1 = require("./compareJsons");
const readFileContent_1 = require("./readFileContent");
program
    .command('html-resources')
    .description('Helps to find sources in Html document')
    .arguments('<path>')
    .action((path) => (0, parserForHtml_1.parserForHtml)(path));
program
    .command('json-diff')
    .description('Compares two JSON files and shows the differences')
    .arguments('<oldJsonPath> <newJsonPath>')
    .action((oldJsonPath, newJsonPath) => {
    const oldJsonContent = (0, readFileContent_1.readFileContent)(oldJsonPath);
    const newJsonContent = (0, readFileContent_1.readFileContent)(newJsonPath);
    const diff = (0, compareJsons_1.compareJsons)(oldJsonContent, newJsonContent);
    console.log(JSON.stringify(diff, null, 2));
});
program.parse(process.argv);
