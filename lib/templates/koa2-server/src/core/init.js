const requireDirectory = require('require-directory');     // 路由自动加载
const Router = require('koa-router');

class InitManager {
  static initCore (app) {
    InitManager.app = app;
    InitManager.initLoadRouter();
    InitManager.loadHttpException();
    InitManager.loadConfig();
  }

  static loadConfig(path = '') {
    const configPath = path || process.cwd() + '/src/config/config.js';
    const config = require(`${configPath}`);
    global.config = config;
  }

  static initLoadRouter () {
    const appApiDirectory = `${process.cwd()}/src/app/api`;
    requireDirectory(module, appApiDirectory, {
      visit: whenLoadModule
    });

    function whenLoadModule (obj) {
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes());
      }
    }
  }

  // 将异常处理绑定到全局global上，以便调用
  static loadHttpException () {
    const errors = require('./http-exception');
    global.errs = errors;
  }
}

module.exports = InitManager