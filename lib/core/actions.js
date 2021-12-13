const { readdir } = require("fs/promises");
const { resolve } = require("path");
const { promisify } = require("util");
// const download = promisify(require("download-git-repo"));
const chalk = require("chalk");
// const { koaProjectRepo } = require("../config/repo-config");
const { copyFiles } = require("../utils/utils");
const createProjectAction = async (project) => {
  // clone 项目
  const { exist, files } = await dirInfo(project);

  if (exist && files[0]) {
    console.log(
      `The directory ${chalk.green(
        project
      )} contains files that could conflict:`
    );
    console.log();
    for (const file of files) {
      console.log(`   ${file}`);
    }
    console.log();
    console.log(
      "Either try using a new directory name, or remove the files listed above."
    );
  } else {
    /* console.log(`Creating a new project in ${chalk.green(resolve(process.cwd(), project))}`);
    console.log();
    console.log('Installing packages. This might take a couple of minutes...');
    console.log();

    try {
      const startTime = new Date().getTime();
      await download(koaProjectRepo, project, { clone: true});
      const endTime = new Date().getTime();
      console.log(`${chalk.green('success')} install packages`);
      console.log(`Done in ${(endTime - startTime)/1000}s`);
    } catch(err) {
      console.log(`${chalk.red('Error:')}${err.toString().substring(6)}`);
    } */

    const dest = resolve(process.cwd(), project);
    console.log(`Creating a new project in ${chalk.green(dest)}`);

    try {
      await copyLocalTpl(dest);
    } catch (err) {
      console.log(`${chalk.red("Error:")}${err.toString().substring(6)}`);
    }
  }
};

async function dirInfo(project) {
  const destDir = process.cwd();
  const projectName = project.split("/").pop();
  const dirs = await readdir(destDir);
  const projectIndex = dirs.findIndex((dir) => dir === projectName);
  if (projectIndex > -1) {
    const files = await readdir(resolve(destDir, projectName));

    return {
      exist: true,
      files,
    };
  }

  return {
    exist: false,
    files: [],
  };
}

// 拷贝本地模板
async function copyLocalTpl(project) {
  try {
    const tplPath = resolve(__dirname, "../templates/koa2-server");
    await copyFiles(tplPath, project);
    console.log(`${chalk.green("Success!")}`);
  } catch (err) {
    console.log(`${chalk.red("Failed!")}`);
  }
}

module.exports = {
  createProjectAction,
};
