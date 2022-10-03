import { celebrate, errors, Joi } from "celebrate";
import { Router, Response, NextFunction } from "express";
import Container from "typedi";
import { Logger } from "winston";
import { ILocationInputDTO } from "../../interfaces/ILocation";
import LocationService from "../../services/locationService";
import { AuthRequest } from "../../types/express/request";
import { locationValidator } from "../validators/location";
import { sendHttpError } from "../errors";

const route = Router();

export default (app: Router) => {
  const logger: Logger = Container.get("logger");
  const locationService = Container.get(LocationService);
  


  app.use("/location", route);
  app.use(errors());

  route.get(
    "",
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling get location endpoint");
      try {
        const locations = await locationService.getCustomized();
        return res.status(200).json({ locations });
      } catch (e) {
        logger.error("🔥 error on calling get locations endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );

  route.get(
    "/details",
    celebrate({
      query: Joi.object({
        locationId: Joi.string(),
      }),
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling get location endpoint");
      try {
        const location = await locationService.getOne(
          req.query.locationId as string
        );

        return res.status(200).json({ location });
      } catch (e) {
        logger.error("🔥 error on calling get location endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );

  route.post(
    "/getCustomized",
    celebrate({
      body: Joi.object({
        filter: Joi.object().optional(),
        sort: Joi.object()
          .pattern(Joi.string(), Joi.number().valid(1, -1))
          .optional(),
        skip: Joi.number().optional(),
        limit: Joi.number().optional(),
      }),
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling get customized location endpoint");

      let skip, limit;

      if (req.body.skip) skip = parseInt(req.body.skip as string);
      if (req.body.limit) limit = parseInt(req.body.limit as string);
      try {
        const locations = await locationService.getCustomized(
          req.body.filter as object,
          req.body.sort as object,
          skip,
          limit
        );
        return res.status(200).json({
          locations,
        });
      } catch (e) {
        logger.error("🔥 error on calling get location endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );

  route.put(
    "",
    celebrate({
      body: locationValidator,
      query: Joi.object({
        locationId: Joi.string().required(),
      }),
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling update location endpoint with body: %o", req.body);

      try {
        const requestBody = req.body;
        requestBody.user = req.user?.sub;
        const location = await locationService.update(
          requestBody as ILocationInputDTO,
          req.query.locationId as string
        );

        return res.status(201).json({ location });
      } catch (e) {
        logger.error("🔥 error on calling update location endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );
  route.post(
    "",
    celebrate({
      body: locationValidator,
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Calling create location endpoint with body: %o", req.body);

      try {
        const requestBody = req.body;
        requestBody.user = req.user?.sub;
        const location = await locationService.create(
          requestBody as ILocationInputDTO
        );
        return res.status(201).json({ location });
      } catch (e) {
        logger.error("🔥 error on calling update location endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );

  route.delete(
    "/multiple",
    celebrate({
      body: Joi.object({
        locationsIds: Joi.array().items(Joi.string()).optional(),
      }),
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Deleting locations with ids: %o", req.body.locationsIds);

      try {
        const check = await locationService.multipleDelete(
          req.body.locationsIds as string[]
        );

        if (check) return res.status(201).json({ success: true });

        return res
          .status(404)
          .json({ error: "One or more location not found" });
      } catch (e) {
        logger.error("🔥 error on calling delete locations endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );

  route.delete(
    "",
    celebrate({
      query: Joi.object({
        locationId: Joi.string().required(),
      }),
    }),
    async (req: AuthRequest, res: Response, next: NextFunction) => {
      logger.debug("Deleting an location with id: %o", req.query.locationId);

      try {
        const check = await locationService.multipleDelete([
          req.query.locationId as string,
        ]);
        if (check) return res.status(201).json({ success: true });

        return res.status(404).json({ error: "Location not found" });
      } catch (e) {
        logger.error("🔥 error on calling delete an location endpoint: %o", e);
        sendHttpError(e, res, next);
      }
    }
  );
};
