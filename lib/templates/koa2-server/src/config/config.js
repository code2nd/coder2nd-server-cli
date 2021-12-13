module.exports = {
  port: 3000,
  database: {
    dbName: 'your dbname',
    host: 'your host',
    port: 3306,
    user: 'your username',
    password: 'your password'
  },
  security: {
    secretKey: 'lkljfjcdsdhihnd$%&#DdfsDsdfdfd^&SDsds', // jwt令牌加密随机字符串，越复杂无规律越好
    expiresIn: 60 * 60 * 24       // 令牌的过期时间，60*60代表的是一个小时
  },
  redis: {
    port: 6379,
    host: "your host",
    password: "your password",
    db: 1
  },
  AUTH_LEVEL: {
    USER: 8,
    ADMIN: 16
  }
}