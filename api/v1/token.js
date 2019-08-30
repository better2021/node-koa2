const Router = require("koa-router")

const router = new Router({
  prefix:"/v1/token"
})

router.post("/",async(ctx)=>{
  const v = await new TokenValidator().validate(ctx)
})

module.exports = router