const { program } = require('commander');
import { parserForHtml } from "./parserForHtml";
import { compareJsons } from "./compareJsons";
import { readFileContent } from "./readFileContent";

program
  .command('html-resources')
  .description('Helps to find sources in Html document')
  .arguments('<path>')
  .action((path: string) => parserForHtml(path));

program
  .command('json-diff')
  .description('Compares two JSON files and shows the differences')
  .arguments('<oldJsonPath> <newJsonPath>')
  .action((oldJsonPath: string, newJsonPath: string) => {
    const oldJsonContent = readFileContent(oldJsonPath);
    const newJsonContent = readFileContent(newJsonPath);
    const diff = compareJsons(oldJsonContent, newJsonContent);
    console.log(JSON.stringify(diff, null, 2));
  });

program.parse(process.argv);