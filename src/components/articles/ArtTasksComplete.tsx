import React, { HTMLAttributes, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckCircle } from "lucide-react";
import { TaskContext } from "@/context/TaskContext";

export default function ArtTasksComplete({
  className,
}: HTMLAttributes<HTMLElement>) {
  const { taskState } = useContext(TaskContext)!;
  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-items-center">
        <CardTitle>Tarefas Completas</CardTitle>
        <CheckCircle className="ml-auto" width={16} />
      </CardHeader>
      <CardContent>
        <CardDescription className="">
          Tarefas que já foram compridas com sucesso!!
        </CardDescription>
        <p className="text-base sm:text-lg font-bold">
          {taskState.filter((task) => task.status === "done").length} tarefas
          concluídas
        </p>
      </CardContent>
    </Card>
  );
}
