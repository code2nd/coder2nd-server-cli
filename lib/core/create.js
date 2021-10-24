const { createProjectAction } = require('./actions');

const createCommands = (program) => {
  program
    .command('create <project> [options]')
    .description('clone a repository into a folder')
    .action(createProjectAction)
};

module.exports = createCommands;