import ITasks from "@/types/tasks";
import { z, ZodEffects, ZodObject, ZodString } from "zod";

export const schema = (
  tasks: ITasks[]
): ZodObject<{
  name: ZodEffects<ZodString, string, string>;
  desc: ZodEffects<ZodString, string, string>;
}> => {
  return z.object({
    name: z
      .string()
      .min(10, { message: "O nome deve ter pelo menos 10 caracteres" })
      .max(25, { message: "O nome da tarefa não pode passar de 25 caracteres" })
      .refine(
        (val) =>
          !tasks.some((task) => task.name.toLowerCase() === val.toLowerCase()),
        { message: "Já existe uma tarefa com este nome." }
      ),
    desc: z
      .string()
      .min(15, { message: "A descrição deve ter no mínimo 15 caracteres" })
      .max(200, { message: "A descrição não pode passar de 200 caracteres" })
      .refine(
        (val) =>
          !tasks.some((task) => task.desc.toLowerCase() === val.toLowerCase()),
        { message: "Já existe uma tarefa com essa descrição." }
      ),
  });
};
