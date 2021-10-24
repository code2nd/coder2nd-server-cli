const chalk = require('chalk');
const commander = require('commander');
const createCommands = require('./create');

const packageJson = require('../../package.json');

const init = () => {
  const program = new commander.Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .allowUnknownOption()
    .on('--help', () => {
      console.log(
        `Only ${chalk.green('<project-directory>')} is required.`
      );
    });

  // 创建指令
  createCommands(program);

  program.parse(process.argv);
};

module.exports = {
  init
};