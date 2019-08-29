const { sequelize } = require("../core/db")

const { Sequelize, Model } = require("sequelize")

class User extends Model {}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true, // 主键
      autoIncrement: true // 自增型
    },
    nickname: Sequelize.STRING,
    phone: Sequelize.STRING,
    password: Sequelize.STRING,
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  { sequelize, tableName: "user" } // tableName: "user" 自定义表名为user
)
