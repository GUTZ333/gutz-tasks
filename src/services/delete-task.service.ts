"use server"

import { authOptions } from "@/lib/auth-options.lib"
import { envs } from "@/schemas/envs.schema"
import { getServerSession } from "next-auth"
import { revalidateTag } from "next/cache"

export async function deleteTask({ titleTask }: { titleTask: string }) {
  const session = await getServerSession(authOptions);
  try {
    const response = await fetch(`${envs.BACKEND_URI}/tasks/remove/${titleTask}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${session?.accessToken}`
      },
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("erro no fetch da respota", error)
      return
    }

    revalidateTag("delete-task")
  }
  catch (err) { console.error("erro inesperado na api: ", err) }
}