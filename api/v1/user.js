const Router = require("koa-router")

const { success } = require("../../lib/helper")

const { User } = require("../../models/user")
const { RegisterValidator } = require("../../validators/validator")
const router = new Router({
  prefix: "/v1/user" // 定义路由的前缀
})

// 注册
router.post("/register", async ctx => {
  const v = await new RegisterValidator().validate(ctx)

  const user = {
    phone: v.get("body.phone"),
    password: v.get("body.password"),
    nickname: v.get("body.nickname")
  }
  await User.create(user)
  // success()
})

module.exports = router
