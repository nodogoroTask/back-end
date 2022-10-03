import express from "express";
import compression from "compression"; // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import config from "../config";
import routes from "../api";
import errorHandler from "errorhandler";
import cors from "cors";

import { swaggerUi, specs } from "./swagger";
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${config.domain}.well-known/jwks.json`,
  }),
  audience: config.audience,
  issuer: config.domain,
  algorithms: ["RS256"],
});

export default ({ app }: { app: express.Application }) => {
  app.use(cors());  
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  app.get("/", (req: express.Request, res: express.Response) => {
    res.json({ message: "The app is up and running!" });
  });

  app.use(jwtCheck);

  /**
   * Error Handler. Provides full stack - remove for production
   */
  app.use(errorHandler());

  /**
   * Primary app routes.
   */
  
  // Express configuration
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));

  /**
   * Load API routes.
   */

  app.use(config.api.prefix, routes());
};
