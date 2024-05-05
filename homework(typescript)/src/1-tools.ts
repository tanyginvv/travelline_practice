const { program } = require('commander');
import { parserForHtml } from "./htmlParser"
import { compareJsons } from "./compareJsons";
import { readFileContent } from "./readFileContent";

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