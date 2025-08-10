"use client";

import { createTaskSchema, typeCreateTaskSchema } from "@/schemas/create-task.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function useFormCreateTask() {
  return useForm<typeCreateTaskSchema>({resolver: zodResolver(createTaskSchema)})
}