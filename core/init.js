const Router = require("koa-router")
const requireDirectory = require("require-directory")

class InitManager {
  static initCore(app) {
    // 入口方法
    InitManager.app = app
    InitManager.initLoadRouters()
    InitManager.loadHttpException()
  }

  static initLoadRouters() {
    // path
    const apiDir = `${process.cwd()}/api`
    // 自动导入路由
    requireDirectory(module, apiDir, { visit: whenLoadModule })
    function whenLoadModule(obj) {
      // 判断自动加载的模块是否为路由类型
      if (obj instanceof Router) {
        InitManager.app.use(obj.routes())
      }
    }
  }

  static loadHttpException() {
    const errors = require("./http-exception")
    global.errs = errors
  }
}

module.exports = InitManager
