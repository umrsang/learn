const Koa = require("koa");
const Router = require("koa-router");
const mongoose  = require("mongoose");
const bodyParser = require("koa-bodyparser");

const apiUser = require("./api/user");
const passport = require('koa-passport');

const {mongoDBUrl} = require('./config/key')

mongoose.connect(mongoDBUrl, { useNewUrlParser: true })
.then(()=>{
  console.log(`mongoDB connect ${mongoDBUrl}`);
}).catch(()=>{
  console.log("mongoDB connect fail....."); 
})

const app = new Koa();
const router = new Router();

router.use("/api/users", apiUser);

router.get("/", async (ctx)=>{
  ctx.body = {msg: "hello koa"};
}) 

app.use(bodyParser());
require('./config/passport')(passport);
// app.use(passport.initialize())
// app.use(passport.session())

//配置路由
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT = 5000;

app.listen(port, ()=>{
  console.log("");
  console.log(`serve start at port: ${port}....`);
})