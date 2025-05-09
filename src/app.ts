import Koa, { DefaultContext, DefaultState, ParameterizedContext } from "koa";
import "./entities";
import "colors";
import { connectWithDB } from "./entities";
import { UsersController } from "./controllers";
import { createKoaServer } from "routing-controllers";

const port = 3000;

const startApp = async () => {
  const app: Koa<DefaultState, DefaultContext> = createKoaServer({
    controllers: [UsersController],
  })
  await connectWithDB(app);

  app.listen(port).on("listening", () => {
    console.log(`Server is running on http://localhost:${port}`.blue.bold);
  });
};

startApp().catch((err) => {
  console.error("Error starting the app:", err);
});
