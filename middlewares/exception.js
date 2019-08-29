const { HttpException } = require("../core/http-exception")

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.message,
        error_code: error.errorCode,
        request: error.requestUrl
      }
      ctx.status = error.code
    } else {
      ctx.body = {
        msg: "we made a mistake ~",
        error_code: 999,
        request: ctx.method
      }
    }
  }
}

module.exports = catchError
