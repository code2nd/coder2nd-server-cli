const Router = require('koa-router');

const { 
  NotEmptyValidator
} = require('../validators/validator');
const { success } = require('../../utils');

const router = new Router({
  prefix: '/test'
});

// 测试 GET /test/list
router.get('/list', async (ctx) => {
  const v = await new NotEmptyValidator('page', 'pageSize').validate(ctx);
  const page = parseInt(v.get('query.page'));
  const pageSize = parseInt(v.get('query.pageSize'));

  ctx.body = {
    page,
    pageSize,
    total: 2,
    data: [
      {
        id: 1,
        data: '数据一'
      },
      {
        id: 2,
        data: '数据二'
      }
    ]
  };
});

// 测试 POST /test/list
router.post('/list', async (ctx) => {
  const v = await new NotEmptyValidator('name', 'age').validate(ctx);
  const name = v.get('body.name');
  const age = v.get('body.age');

  console.log(name, age);
  success();
});

// 测试 PUT /test/list
router.put('/list', async (ctx) => {
  const v = await new NotEmptyValidator('name', 'age').validate(ctx);
  const name = v.get('body.name');
  const age = v.get('body.age');

  console.log(name, age);
  success();
});

// 测试 DELETE /test/list
router.delete('/list', async (ctx) => {
  const v = await new NotEmptyValidator('key').validate(ctx);
  const key = v.get('query.key');

  console.log(key);
  success();
});

module.exports = router;