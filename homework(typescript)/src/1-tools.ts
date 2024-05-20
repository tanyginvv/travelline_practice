import { program } from 'commander';
import { parserForHtmlResult } from "./parserForHtml";
import { compareJsonsResult } from "./compareJsons";

program
  .command('html-resources')
  .description('Helps to find sources in Html document')
  .arguments('<path>')
  .action(async(path: string) => console.log(await parserForHtmlResult(path)));

program
  .command('json-diff')
  .description('Compares two JSON files and shows the differences')
  .arguments('<oldJsonPath> <newJsonPath>')
  .action(async (oldJsonPath: string, newJsonPath: string) => 
    console.log(JSON.stringify(await compareJsonsResult(oldJsonPath, newJsonPath), null, 2)));

program.parse(process.argv);