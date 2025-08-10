import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getTask } from "@/services/get-task.service";
import { AlertTriangle, CalendarClock, CircleCheck, Loader } from "lucide-react";
import Link from "next/link";

interface Props {
  params: {
    nametask: string;
  }
}

export default async function Task({ params }: Props) {
  const { nametask } = params;
  const task = await getTask({ titleTask: nametask });
  if (!task) return <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 mb-4">
      <AlertTriangle className="w-8 h-8" />
    </div>
    <h2 className="text-2xl font-semibold mb-2">Task not found.</h2>
    <p className="text-muted-foreground mb-6">
      The task you are trying to access does not exist or has been removed.
    </p>
    <div className="flex gap-3">
      <Link href="/tasks">
        <Button variant="outline">Back to list</Button>
      </Link>
      <Link href="/tasks/create">
        <Button>Create new task</Button>
      </Link>
    </div>
  </div>

  return (
    <div className="mx-auto px-6 py-10 w-full h-full min-h-[calc(100vh-64px)] flex items-center justify-center">
      <Card className="p-4 max-w-3xl scale-150">
        <CardHeader>
          <CardTitle className="text-2xl w-full flex justify-between items-center">
            {task.taskTitle}
            <Badge>
              {!task?.taskIsDone ? <>pending <Loader /></> : <>done <CircleCheck className="fill-green-500 dark:fill-green-400" width={25} /></>}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <CardDescription className="flex items-center gap-1"><CalendarClock width={18} /> Criada em: {new Date(task.taskCreatedAt).toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</CardDescription>
            <CardDescription className="flex items-center gap-1"><CalendarClock width={18} /> Atualizada em: {new Date(task.taskUpdateAt).toLocaleDateString("pt-br", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}</CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}