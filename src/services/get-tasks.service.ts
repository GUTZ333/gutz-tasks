import { ITasksDataTable } from "@/app/(private)/tasks/page";
import { authOptions } from "@/lib/auth-options.lib";
import { envs } from "@/schemas/envs.schema";
import { getServerSession } from "next-auth";

export async function getTasks(): Promise<ITasksDataTable[] | undefined> {
  const session = await getServerSession(authOptions);
  if (!session || !session.accessToken) return undefined;
  try {
    const response = await fetch(`${envs.BACKEND_URI}/tasks`, {
      method: "GET",
      next: {
        tags: ["create-task", "complete-task", "delete-task", "edit-title-task"]
      },
      headers: {
        "Authorization": `Bearer ${session?.accessToken}`
      }
    })
    if (!response.ok) {
      const error = await response.text();
      console.error("erro na resposta do fetch: ", error)
      return undefined
    }

     return await response.json(); 
  }
  catch (err) {
    console.error("erro inesperado na API: ", err)
  }
}