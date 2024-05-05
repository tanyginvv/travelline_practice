import { program } from 'commander';
import { parserForHtml } from "./parserForHtml";
import { compareJsons } from "./compareJsons";

program
  .command('html-resources')
  .description('Helps to find sources in Html document')
  .arguments('<path>')
  .action((path: string) => parserForHtml(path));

program
  .command('json-diff')
  .description('Compares two JSON files and shows the differences')
  .arguments('<oldJsonPath> <newJsonPath>')
  .action((oldJsonPath: string, newJsonPath: string) => 
    compareJsons(oldJsonPath, newJsonPath));

program.parse(process.argv);