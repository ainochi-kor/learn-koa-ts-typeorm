import Koa, { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import Router from "koa-router";
import "colors";

const port = 3000;

const app: Koa<DefaultState, DefaultContext> = new Koa();
const router = new Router();

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: "Hello World!" };
    console.log("Request received at /".green);
  }
);

app.use(router.routes()).use(router.allowedMethods());
app.listen(port).on("listening", () => {
  console.log(`Server is running on http://localhost:${port}`.blue.bold);
});
