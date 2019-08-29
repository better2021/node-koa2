module.exports = {
  env: "dev",
  database: {
    dbName: "node", // 数据库名
    host: "localhost",
    port: 3306,
    user: "root",
    password: "709463253"
  },
  security: {
    secretKey: "qwert",
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appid: "wx0589d38e02c0b60c",
    appsecret: "2c3d7c4bcae7ac7b4b6029b92a1c80c1",
    loginUrl: "https://api.weixin.qq.com/sns/jscode2session"
  }
}
