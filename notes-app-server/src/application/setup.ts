import { createRoutes } from "../controllers/routes";
import { DatabasePort } from "../persist/database.port";
import { PrismaDBAdapter } from "../persist/prismaDB.adapter";
import { NotesService } from "../services/notes.service";
import prisma from "./prisma.singleton";

export type AppDependencies = {
  notesService: NotesService;
};

/**
 * Create the app router
 */
export const createAppRouter = () => {
  const services = initAppDependencies();

  const router = createRoutes(services);
  return router;
};

/**
 * Initialize the app dependencies
 */
function initAppDependencies(): AppDependencies {
  const database: DatabasePort = new PrismaDBAdapter(prisma);
  const notesService = new NotesService(database);
  return { notesService };
}
