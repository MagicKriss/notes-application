import express from "express";
import { AppDependencies } from "../../application/setup";
import { createNotesHandler } from "./notes.handler";

export const createV1Routes = (env: AppDependencies) => {
  const { notesService } = env;

  const { getListOfNotes, createNote, updateNote, deleteNote } =
    createNotesHandler(notesService);

  const router = express.Router();

  router.get("/notes", getListOfNotes);
  router.post("/notes", createNote);
  router.put("/notes/:id", updateNote);
  router.delete("/notes/:id", deleteNote);

  return router;
};
