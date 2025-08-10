"use server";

import { authOptions } from "@/lib/auth-options.lib";
import { typeCreateTaskSchema } from "@/schemas/create-task.schema";
import { envs } from "@/schemas/envs.schema";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function handleCreateTaskService({ titleTask }: typeCreateTaskSchema) {
  const session = await getServerSession(authOptions)
  try {
    const response = await fetch(`${envs.BACKEND_URI}/tasks/create`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        taskTitle: titleTask
      }),
    })

    if (!response.ok) {
      const error = await response.text();
      console.error("erro no fetch da resposta: ", error)
      return
    }

    revalidateTag("create-task")
  }
  catch (err) {
    console.error("erro inesperado na api: ", err)
  }
}