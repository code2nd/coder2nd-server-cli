const Sequelize = require('sequelize');
const { 
  database: {
    dbName, 
    host, 
    port, 
    user, 
    password
  }
} = require('../config/config');

const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql', // 数据库的类型
  port,
  host,
  logging: true, // 操作数据库的时候会将原始的sql语句显示在命令行中
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  timezone: '+08:00', // 时区， 如果不设置的话，sequelize 默认设置的时间会跟北京时间相差8小时
  define: {
    timestamps: true, // 默认为true，false则创建模型时将不创建下面两个字段
    createdAt: "create_time",  //自定义时间戳
    updatedAt: "update_time", // 自定义时间戳
  }
});

sequelize.sync();

module.exports = {
  sequelize
};