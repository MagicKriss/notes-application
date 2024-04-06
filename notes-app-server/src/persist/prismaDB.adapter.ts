import { PrismaClient } from "@prisma/client";
import { Note, NoteWithId } from "../validation/note.schema";
import { DatabasePort } from "./database.port";

export class PrismaDBAdapter implements DatabasePort {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  createNote = (note: Note) => {
    return this.prisma.note.create({
      data: note,
    });
  };

  getNotes = () => {
    return this.prisma.note.findMany();
  };

  updateNote = (note: NoteWithId) => {
    const { id, ...data } = note;
    return this.prisma.note.update({
      where: { id },
      data,
    });
  };

  deleteNote = async (id: number) => {
    await this.prisma.note.delete({
      where: { id },
    });
  };
}
