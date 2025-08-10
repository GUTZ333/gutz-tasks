"use server"

import { authOptions } from "@/lib/auth-options.lib"
import { envs } from "@/schemas/envs.schema"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache";

export async function editTitleTask({ newTaskTitle, taskTitle }: { taskTitle: string, newTaskTitle: string }) {
  const session = await getServerSession(authOptions);

  try {
    const response = await fetch(`${envs.BACKEND_URI}/tasks/update/${taskTitle}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        taskTitle: newTaskTitle
      })
    })

    if (!response.ok) {
      const err = await response.json()
      console.error("erro na resposta do fetch: ", err)
      return
    }

    revalidateTag("edit-title-task")
  }
  catch (err) {
    console.error("erro inesperado da api: ", err)
  }
}