import { z } from "zod";

export const createTaskSchema = z.object({
  titleTask: z.string({ message: "this field must be a string" }).nonempty({ message: "this field cannot be empty." }).min(6, { message: "the task must has at least 6 characters.0" }).max(40, { message: "this task can only have a maximum of 40 characters" })
})

export type typeCreateTaskSchema = z.infer<typeof createTaskSchema>