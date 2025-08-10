import React from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

import { getTasks } from "@/services/get-tasks.service";
import AlertDialogDeleteTask from "@/components/delete-task";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";


export default async function DeleteTask() {
  const tasks = await getTasks();

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted text-muted-foreground mb-4">
          <Trash2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No tasks to delete</h2>
        <p className="text-muted-foreground mb-6">
          The task you want to delete probably does not exist or has already been removed.
        </p>
        <div className="flex gap-3">
          <Link href="/tasks">
            <Button variant="outline">Back to tasks</Button>
          </Link>
          <Link href="/tasks/create">
            <Button>Create new task</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {tasks.map((task) => (
        <React.Fragment key={task.taskId}>
          <Card className="mt-2 mb-3 p-1">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>{task.taskTitle}</CardTitle>
              <AlertDialogDeleteTask taskTitle={task.taskTitle} />
            </CardHeader>
          </Card>
        </React.Fragment>
      ))}
    </>
  );
}
