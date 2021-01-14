import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {promisify} from 'util';
import { fileURLToPath } from 'url';

import execa from 'execa';
import Listr from 'listr';
import {projectInstall} from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  // not sure why this is async it doesn't use await - i ran it without async it works fine
  try {

    return copy(options.templateDirectory, options.targetDirectory, {
      clobber: false
    });
  } catch (e) {
    console.log(`%s[copyTemplateFiles] an error occured`,chalk.red.bold("Error"));
  } // catch
}// copyTemplateFiles

async function initGit(options) {
  try {

    const result = await execa("git",["init"], {
      cwd: options.targetDirectory
    });

    if(result.failed) {
      return Promise.reject(new Error("Failed to initialize Git"));
    }// if

    return;
  } catch (e) {
    console.log(`%s[initGit] an error occured`,chalk.red.bold("Error"));
  }
}// initGit

export async function createProject(options){
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd()
  }// options

  const currentFileUrl  = import.meta.url;// idk what this is

  console.log('[currentFileUrl]',currentFileUrl);
  console.log('[newPathName]',new URL(currentFileUrl));
  console.log('[dirname]',__dirname);
  console.log('[path dirname]',path.dirname(fileURLToPath(currentFileUrl)));

  const templateDir = path.resolve(
    // new URL(currentFileUrl).pathname,
    // __dirname,
    path.dirname(fileURLToPath(currentFileUrl)),
    '../templates',
    options.template.toLowerCase()
  );

  console.log("[templateDir]",templateDir);

  options.templateDirectory = templateDir;

  try {
    // try to read from the template
    await access(templateDir, fs.constants.R_OK);
  } catch (e) {
    console.error("%s Invalid template name", chalk.red.bold("ERROR"));
    process.exit(1);
  }// catch

  // console.log("Copy project files");
  // await copyTemplateFiles(options);
  try {

    const tasks = new Listr([
      {
        title: "Copy project files",
        task: () => copyTemplateFiles(options),
      },
      {
        title: "Initialize git",
        task: () => initGit(options),
        enabled: () => options.git
      },
      {
        title: "Install dependencies",
        task: () => projectInstall({
          cwd: options.targetDirectory
        }),
        skip: () => !options.runInstall ? "Pass --install to automatically install dependencies" : undefined
      }
    ]);

    await tasks.run();

    console.log('%s Project ready', chalk.green.bold('DONE'));

    return true;

  } catch (e) {
    console.log(`%s[Listr] an error occured`,chalk.red.bold("Error"));
  }// catch

}// createProject
