import Koa, { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import Router from "koa-router";
import "./entities";
import "colors";
import { connectWithDB } from "./entities";

const port = 3000;

const startApp = async () => {
  const app: Koa<DefaultState, DefaultContext> = new Koa();

  const router = new Router();

  await connectWithDB(app);

  router.get(
    "/",
    async (ctx: ParameterizedContext<DefaultState, DefaultContext>, next) => {
      await next();
      ctx.body = { msg: "Hello World!" };
      console.log("Request received at /".green);
    }
  );

  app.use(router.routes()).use(router.allowedMethods());
  app.listen(port).on("listening", () => {
    console.log(`Server is running on http://localhost:${port}`.blue.bold);
  });
};

startApp().catch((err) => {
  console.error("Error starting the app:", err);
});
