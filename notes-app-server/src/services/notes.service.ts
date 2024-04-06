import { DatabasePort } from "../persist/database.port";
import { Note, NoteWithId } from "../validation/note.schema";

export class NotesService {
  private database: DatabasePort;
  constructor(database: DatabasePort) {
    this.database = database;
  }

  async getNotes() {
    return await this.database.getNotes();
  }

  createNote(note: Note) {
    return this.database.createNote(note);
  }

  updateNote(note: NoteWithId) {
    return this.database.updateNote(note);
  }

  deleteNote(id: number) {
    return this.database.deleteNote(id);
  }
}
