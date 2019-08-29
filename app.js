const Koa = require("koa")
const Router = require("koa-router")
const parser = require("koa-bodyparser")
const InitManager = require("./core/init")
const catchError = require("./middlewares/exception")

require("./models/user")

// 实例化
const app = new Koa()
const router = new Router()

InitManager.initCore(app)

/**
 *  注册,app.use只会自动执行第一个中间件
 *  ctx 上下文， next  下一个中间件函数
 */
router.get("/", (ctx, next) => {
  ctx.body = "<p>hello node.js</p>"
})

app.use(router.routes())
app.use(parser()) // 使用 koa-bodyparser 中间件
app.use(catchError)

// 导出router
module.exports = {
  router
}

app.listen(3000)
