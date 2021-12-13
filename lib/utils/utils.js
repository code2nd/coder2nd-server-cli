const { resolve } = require("path");
const { copyFile, access, mkdir, stat, readdir } = require("fs/promises");
const { constants } = require("fs");

async function copyFiles(src, dest) {
  src = resolve(__dirname, src);
  dest = resolve(__dirname, dest);

  // 判断 dest 目录是否存在，若不存在则创建
  makedir(dest);

  try {
    // 遍历文件夹里的内容
    const files = await readdir(src);
    for (let file of files) {
      const _file = file;
      file = resolve(src, file);
      const res = await stat(file);

      if (res.isFile()) {
        copyFile(file, resolve(dest, _file));
      } else {
        copyFiles(file, resolve(dest, _file));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function makedir(dirname) {
  try {
    await access(dirname, constants.R_OK | constants.W_OK);
  } catch (err) {
    await mkdir(dirname);
  }
}

module.exports = {
  copyFiles,
};
