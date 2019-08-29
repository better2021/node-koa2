const Router = require("koa-router")
const router = new Router()

const { PositiveValidator } = require("../../validators/validator")

router.post("/v1/classic/latest", async (ctx, next) => {
  const query = ctx.request.query
  const header = ctx.request.header
  const body = ctx.request.body
  console.log(query, body)
  const v = await new PositiveValidator().validate(ctx)

  ctx.body = { key: "classic" }
})

module.exports = router
