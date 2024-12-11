import { z } from "zod";

export const HTaskSchema = z.object({
  title: z
    .string()
    .trim() 
    .refine((value) => value.length > 0, "Task title cannot be blank or spaces only") 
});
