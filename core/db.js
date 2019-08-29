const Sequelize = require("sequelize")

const {
  dbName,
  host,
  port,
  user,
  password
} = require("../config/config").database

const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql", // 数据库类型
  host,
  port,
  logging: true,
  timezone: "+08:00",
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at", // 自定义自动生成的字段名
    updatedAt: "updated_at",
    deletedAt: "deleted_at"
  }
})

sequelize.sync({
  force: true // 同步更新字段
})

// 导出的名字可以用db代替,相当于es6中的as
module.exports = { sequelize }
