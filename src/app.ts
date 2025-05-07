import Koa, { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import Router from "koa-router";
import "colors";

const port = 3000;

const app: Koa<DefaultState, DefaultContext> = new Koa();
const router = new Router();

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next) => {
    await next();
    ctx.body = { msg: "Hello World!" };
    console.log("Request received at /".green);
  }
);

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next) => {
    const startDate = new Date();
    console.log("before body", ctx.body);
    await next();
    console.log("after body", ctx.body);
    const ms = new Date().getTime() - startDate.getTime();
    ctx.set("X-Response-Time", `${ms}ms`);
  }
);

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next) => {
    ctx.body = "Hello World!";
  }
);

app.use(router.routes()).use(router.allowedMethods());
app.listen(port).on("listening", () => {
  console.log(`Server is running on http://localhost:${port}`.blue.bold);
});
