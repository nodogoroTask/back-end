import { Router } from "express";
import {
  LocationRoutes,
  UserRoutes
} from "./routes";

export default () => {
  const app = Router();
  LocationRoutes(app);
  UserRoutes(app);
  return app;
};
