import cors from "cors";
import express from "express";
import { createAppRouter } from "./application/setup";
import helmet from "helmet";

/**
 * Setup the express app
 */
function setupApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(helmet());

  const router = createAppRouter();

  app.use(router);

  return app;
}

const app = setupApp();

// Start the server
app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
