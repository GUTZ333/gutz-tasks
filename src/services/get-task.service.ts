import { authOptions } from "@/lib/auth-options.lib";
import { envs } from "@/schemas/envs.schema";
import { getServerSession } from "next-auth";

export async function getTask({ titleTask }: { titleTask: string }) {
  const session = await getServerSession(authOptions);
  if (!session) return

  try {
    const response = await fetch(`${envs.BACKEND_URI}/tasks/${titleTask}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`
      },
      next: {
        tags: []
      }
    })
    if (!response.ok) {
      const errorText = await response.text();
      console.log("erro na resposta da api: ", errorText)
      return null
    }

    return await response.json();
  }
  catch (err) {
    console.log("erro inesperado: ", err)
  }
}