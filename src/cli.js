import arg from 'arg';
import inquirer from 'inquirer';
import prompts from 'prompts';
import {createProject} from './main';
import {templateChoices} from './template-choices';
import chalk from 'chalk';

function parseArgumentsToOptions(rawArgs){
  const args = arg(
    {
      "--git":Boolean,
      "--yes":Boolean,
      "--install":Boolean,
      "-g":"--git",
      "-y":"--yes",
      "-i":"--install"
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false
  };
}

async function promptForMissingOptions(options) {
  const defaultTemplate = "Hbs";

  if(options.skipPrompts){
    return {
      ...options,
      template: options.template || defaultTemplate
    };
  }// end if .skipPrompts

  const questions = [];

  if(!options.template){
    questions.push({
      type: "rawlist",
      name: "template",
      message: [`Please choose which project template to use`,
      `\n\n ${chalk.cyan("(type the number next to the template you want to select)")}`,
      `\n\n${chalk.yellow.bold("NOTE: There are no more choices to reveal (ignore message below)")}`,
      `\n\n`].join(" "),
      choices: [...templateChoices],
      default: defaultTemplate,
      pageSize: templateChoices.length
    });
  }// end if !.template

  if(!options.git){
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false
    })
  }// end if !.git

  const answers = await inquirer.prompt(questions);
  // const answers = await prompts(questions);// indicator still not changing

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git
  }// return
}// promptForMissingOptions

export async function cli (args) {
  let options = parseArgumentsToOptions(args);
  options = await promptForMissingOptions(options);

  // console.log(options);
  await createProject(options);
}
