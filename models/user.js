const bcrypt = require("bcryptjs")
const { sequelize } = require("../core/db")

const { Sequelize, Model } = require("sequelize")

class User extends Model {
  static async verifyMobilePassword(phone, password) {
    const user = await this.findOne({
      where: {
        phone
      }
    })
    if (!user) {
      throw new AuthError("用户不存在")
    }
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      throw new AuthError("密码不正确")
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await this.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async creatByOpenid(openid) {
    return await this.create({
      openid
    })
  }
}

const secma = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // 主键
    autoIncrement: true // 自增型
  },
  nickname: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    unique: true // 唯一
  },
  password: {
    type: Sequelize.STRING,
    set(val) {
      const salt = bcrypt.genSaltSync(10)
      const psw = bcrypt.hashSync(String(val), String(salt))
      this.setDataValue("password", psw)
    }
  },
  openid: {
    type: Sequelize.STRING(64),
    unique: true
  }
}

User.init(
  secma,
  { sequelize, tableName: "user" } // tableName: "user" 自定义表名为user
)

module.exports = { User }
