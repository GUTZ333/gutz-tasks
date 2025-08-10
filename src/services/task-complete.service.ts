"use server";

import { authOptions } from "@/lib/auth-options.lib";
import { envs } from "@/schemas/envs.schema";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export async function taskComplete({ taskTitle }: { taskTitle: string }, { taskIsDone }: { taskIsDone: boolean }) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${envs.BACKEND_URI}/tasks/update/${taskTitle}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`,
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        taskIsDone
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("erro no fetch da resposta: ", error)
      return
    }

    revalidateTag("complete-task")
  }
  catch (err) { console.error("erro insperado na api", err) }
}