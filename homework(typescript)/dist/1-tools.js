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
const commander_1 = require("commander");
const parserForHtml_1 = require("./parserForHtml");
const compareJsons_1 = require("./compareJsons");
commander_1.program
    .command('html-resources')
    .description('Helps to find sources in Html document')
    .arguments('<path>')
    .action((path) => __awaiter(void 0, void 0, void 0, function* () { return console.log(yield (0, parserForHtml_1.parserForHtmlResult)(path)); }));
commander_1.program
    .command('json-diff')
    .description('Compares two JSON files and shows the differences')
    .arguments('<oldJsonPath> <newJsonPath>')
    .action((oldJsonPath, newJsonPath) => __awaiter(void 0, void 0, void 0, function* () { return console.log(JSON.stringify(yield (0, compareJsons_1.compareJsonsResult)(oldJsonPath, newJsonPath), null, 2)); }));
commander_1.program.parse(process.argv);
