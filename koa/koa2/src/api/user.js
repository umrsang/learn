
const Router = require("koa-router");
const router = new Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { tksecret } = require('../config/key');
const passport = require('koa-passport');

const tools = require("../config/tools");

//引入用户模版
const User = require("../models/user.js");

/***
 * @route GET /api/users/test
 * @desc 测试接口
 * @access everyone
 */
router.get("/test", ctx => {
  ctx.status = 200;
  ctx.body = { meg: " api test work" }
})
/***
 * @route GET /api/users/register
 * @desc 注册接口
 * @access everyone
 */
router.post("/register", async ctx => {
  const form = ctx.request.body;
  console.log('form', form);

  //检查邮箱是否存在
  const result = await User.find({ email: form.email });
  console.log('result', result);

  ctx.status = 200;

  if (result.length > 0) {
    ctx.body = { msg: "用户邮箱已存在" }
  } else {
    const enPassword = tools.encrypt(form.password);
    const newUser = new User({
      name: form.name,
      password: enPassword,
      email: form.email
    })
    await newUser.save().then((result) => {
      ctx.body = result;
    }).catch((err) => {
      ctx.body = { msg: "注册失败" }
    });
  }
})
/***
 * @route GET /api/users/login
 * @desc 登录接口
 * @access everyone
 */
router.post("/login", async ctx => {
  const form = ctx.request.body;
  console.log('form', form);

  //检查邮箱是否存在
  const result = await User.find({ email: form.email });
  const user = result[0]
  console.log('result', result);

  ctx.status = 200;

  if (result.length == 0) {
    ctx.body = { msg: "用户不存在" }
  } else {
    const rightPassword = await bcrypt.compareSync(form.password, user.password);
    console.log("密码匹配结果", rightPassword);

    if (rightPassword) {
      const payload = {
        email: form.email,
        id: user.id
      }
      var token = jwt.sign(payload, tksecret, { expiresIn: "1h" });

      ctx.body = { msg: "登录成功", token: 'Bearer ' + token }
    } else {
      ctx.body = { msg: "密码错误" }
    }
  }
})
/***
 * @route GET /api/users/current
 * @desc 获取用户信息
 * @access 私密的
 */
router.get("/current",
  passport.authenticate('jwt', { session: false }),
  async ctx => {
    ctx.status = 200;
    ctx.body = ctx.state.user;
  })



module.exports = router.routes()