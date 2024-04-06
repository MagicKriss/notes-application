import { Note, NoteWithId } from "../validation/note.schema";

export interface DatabasePort {
  getNotes: () => Promise<NoteWithId[]>;
  createNote: (note: Note) => Promise<NoteWithId>;
  updateNote: (note: NoteWithId) => Promise<NoteWithId>;
  deleteNote: (noteId: number) => Promise<void>;
}
