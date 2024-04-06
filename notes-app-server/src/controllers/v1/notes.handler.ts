import { Request, Response } from "express";
import { NoteIdSchema, NoteSchema } from "../../validation/note.schema";
import { NotesService } from "../../services/notes.service";

const getListOfNotes =
  (service: NotesService) => async (_req: Request, res: Response) => {
    try {
      const notes = await service.getNotes();

      return res.send(notes);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Oops! Something went wrong.");
    }
  };

const createNote =
  (service: NotesService) => async (req: Request, res: Response) => {
    const parseResult = NoteSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res
        .status(400)
        .send(
          `Invalid request body.${parseResult.error.errors
            .map((e) => e.message)
            .join(", ")}`
        );
    }

    try {
      const note = await service.createNote(parseResult.data);

      return res.status(200).send(note);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Oops! Something went wrong.");
    }
  };

const updateNote =
  (service: NotesService) => async (req: Request, res: Response) => {
    const parseResult = NoteSchema.safeParse(req.body);

    if (!parseResult.success) {
      return res
        .status(400)
        .send(
          `Invalid request body.${parseResult.error.errors
            .map((e) => e.message)
            .join(", ")}`
        );
    }
    const parseResultId = NoteIdSchema.safeParse(req.params);

    if (!parseResultId.success) {
      return res
        .status(400)
        .send(
          `Invalid request body.${parseResultId.error.errors
            .map((e) => e.message)
            .join(", ")}`
        );
    }
    const { id } = parseResultId.data;

    try {
      const note = await service.updateNote({ ...parseResult.data, id });
      return res.status(200).send(note);
    } catch (error) {
      console.error(error);
      return res.status(500).send("Oops! Something went wrong.");
    }
  };

const deleteNote =
  (service: NotesService) => async (req: Request, res: Response) => {
    const parseResult = NoteIdSchema.safeParse(req.params);
    if (!parseResult.success) {
      return res
        .status(400)
        .send(
          `Invalid request body.${parseResult.error.errors
            .map((e) => e.message)
            .join(", ")}`
        );
    }
    const { id } = parseResult.data;

    try {
      await service.deleteNote(id);
      return res.status(200).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send("Oops! Something went wrong.");
    }
  };

export const createNotesHandler = (service: NotesService) => ({
  getListOfNotes: getListOfNotes(service),
  createNote: createNote(service),
  updateNote: updateNote(service),
  deleteNote: deleteNote(service),
});
