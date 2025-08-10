import { z } from 'zod';
import "dotenv/config";

const envSchema = z.object({
  NEXTAUTH_URL: z.string().url({ message: "NEXTAUTH_URL deve ser uma URL válida" }),
  BACKEND_URI: z.string().url({ message: "BACKEND_URI deve ser uma URL válida" }),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET não pode ser vazio"),
});

export const envs = envSchema.parse(process.env);
