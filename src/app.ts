import "reflect-metadata"; // We need this in order to use @Decorators

import config from "./config";
import { Container } from "typedi";
import { Logger } from "winston";
import express from "express";
import { appLoader } from "./loaders";
import { mainDatabaseStartConnection } from "./loaders";

async function startServer() {
  const app = express();
  app.get("/", function (req, res) {
    res.send("working");
  });

  appLoader({ app });
  await mainDatabaseStartConnection();
  const logger: Logger = Container.get("logger");
  app
    .listen(config.port, () => {
      logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
      console.log(
        "  App is running at http://localhost:%d in %s mode",
        config.port,
        app.get("env")
      );
    })
    .on("error", (err: any) => {
      logger.error(err);
      process.exit(1);
    });
}
startServer();
