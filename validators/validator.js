const { LinValidator, Rule } = require("../core/lin-validator")
const { User } = require("../models/user")
// const { LoginType } = require("../enum")

class PositiveValidator extends LinValidator {
  constructor() {
    super()
    this.id = [new Rule("isInt", "需要正整数", { min: 1 })]
  }
}

//用户注册参数校验
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.phone = [new Rule("isMobilePhone", "手机号码不正确", "zh-CN")]
    this.password = [
      new Rule("isLength", "密码最少6位，最多32位", {
        min: 6,
        max: 32
      }),
      new Rule(
        "matches",
        "密码必须包含数字、大写英文字母、小写英文字母",
        "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
      )
    ]
    this.repassword = this.password

    this.nickname = [
      new Rule("isOptional"),
      new Rule("isLength", "昵称最少6位，最多16位", {
        min: 6,
        max: 32,
        required: false
      })
    ]
  }
  validatePassword(vals) {
    const psd = vals.body.password
    const repsd = vals.body.repassword
    if (psd !== repsd) {
      throw new Error("两次密码必须相同")
    }
  }
  async validatePhone(vals) {
    const phone = vals.body.phone
    const user = await User.findOne({
      where: { phone }
    })
    if (user) {
      throw new Error("该手机号已经注册")
    }
  }
}

//token接口参数校验
class TokenValidator extends LinValidator {
  constructor() {
    super()

    //账户
    this.account = [new Rule("isLength", "不符合账号规则", { min: 4, max: 32 })]

    this.secret = [
      new Rule("isOptional"),
      new Rule("islength", "至少6个字符", { min: 6, max: 128 })
    ]
  }

  validateLoginType(vals) {
    if (!vals.body.type) {
      throw new Error("登录类型错误")
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error("登录类型错误")
    }
  }
}

//token验证校验

class NotEmptyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [new Rule("isLength", "token不能为空", { min: 1 })]
  }
}

module.exports = {
  PositiveValidator,
  RegisterValidator,
  TokenValidator,
  NotEmptyValidator
}
