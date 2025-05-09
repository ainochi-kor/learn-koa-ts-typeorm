import Koa, { DefaultContext, DefaultState } from "koa";
import Router from "koa-router";
import { DataSource } from "typeorm";
import { config } from "dotenv";
import { PostEntity } from "./posts.entity";
import { UserEntity } from "./users.entity";
import "reflect-metadata";

import "colors";

config();

const { DB_HOST, DB_USER, DB_PASSWORD } = process.env;
console.log({
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
});

export const connectWithDB = async (
  app: Koa<DefaultState, DefaultContext>
): Promise<void> => {
  const connection = new DataSource({
    type: "sqlite",
    database: "./koa.db",
    entities: [UserEntity, PostEntity],
  });

  try {
    await connection.initialize();
    await connection.synchronize(true);
    console.log("Synchronized! with DB".green.bold);
    app.context.db = connection;
  } catch (error) {
    console.error("Failed to sync with DB".red.bold, error);
  }
};
