import { celebrate, errors, Joi } from "celebrate";
import { Router, Response, NextFunction } from "express";
import Container from "typedi";
import { Logger } from "winston";
import UserService from "../../services/userService";
import { AuthRequest } from "../../types/express/request";
import { sendHttpError } from "../errors";

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get("logger");
  const userService = Container.get(UserService);

  app.use("/user", route);
  app.use(errors());

  route.get(
    "/details",
    celebrate({
      query: Joi.object({
        userId: Joi.string(),
      }),
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling get user endpoint");
      try {
        const user = await userService.getOne(req.query.userId as string);

        return res.status(200).json({ user });
      } catch (e) {
        logger.error("🔥 error on calling get user endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );
  
  route.put(
    "",
    celebrate({
      body:Joi.object({
        name: Joi.string()
      })
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling update user endpoint with body: %o", req.body);

      try {
        const requestBody = req.body;

        const user = await userService.update(
          requestBody ,
          req.user?.sub as string
        );

        return res.status(201).json({ user });
      } catch (e) {
        logger.error("🔥 error on calling update location endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );

};
