import express from "express";
import { AppDependencies } from "../application/setup";
import { createV1Routes } from "./v1/routes";

export const createRoutes = (env: AppDependencies) => {
  const router = express.Router();
  const v1Routes = createV1Routes(env);
  router.use("/api/v1", v1Routes);
  // Add more versions here
  return router;
};
