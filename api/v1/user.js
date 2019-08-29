const Router = require("koa-router")
const { RegisterValidator } = require("../../validators/validator")
const router = new Router({
  prefix: "/v1/user" // 定义路由的前缀
})

// 注册
router.post("/register", async ctx => {
  const v = new RegisterValidator().validate(ctx)
  const user = {
    email: v.get("body.email"),
    password: v.get("body.password"),
    nickname: v.get("body.nickname")
  }
})

module.exports = router
