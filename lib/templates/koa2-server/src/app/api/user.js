const Router = require('koa-router');

const { 
  NotEmptyValidator
} = require('../validators/validator');
const { User } = require('../models/user');
const { success } = require('../../utils');
const { Auth } = require('../../middlewares/auth');
const Config = require('../../config/config');

const { AUTH_LEVEL: { USER, ADMIN } } = Config;

const router = new Router({
  prefix: '/user'
});

// 注册(用户名注册)
router.post('/register', async (ctx) => {
  const v = await new NotEmptyValidator('username', 'password1', 'password2').validate(ctx);
  const user = {
    username: v.get('body.username'),
    password: v.get('body.password2')
  };

  await User.registerByUsername(user);
  success();
});

// 登录 (用户名密码登录)
router.post('/login', async (ctx) => {
  const v = await new NotEmptyValidator('username', 'password').validate(ctx);
  const user = {
    username: v.get('body.username'),
    password: v.get('body.password')
  };

  const userInfo = await User.loginByUsername(user);
  ctx.session.userInfo = userInfo;
  ctx.body = {
    isLogin: true,
    username: userInfo.user_name,
    avatar: userInfo.avatar
  }
});

// 退出登录
router.post('/logout', new Auth().m, async (ctx) => {
  ctx.session = null
  success('退出登录成功!')
});

module.exports = router;