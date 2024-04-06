import * as z from "zod";

export const NoteIdSchema = z.object({
  id: z.string().transform((value) => {
    const parsedValue = Number(value);
    if (isNaN(parsedValue)) {
      throw new Error("Invalid ID format. Expected a number.");
    }
    return parsedValue;
  }),
});

export const NoteSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const NoteSchemaWithId = NoteIdSchema.merge(NoteSchema);

export type NoteWithId = z.infer<typeof NoteSchemaWithId>;
export type Note = z.infer<typeof NoteSchema>;
