import React, { HTMLAttributes, useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Timer } from "lucide-react";
import { TaskContext } from "@/context/TaskContext";

export default function ArtTasksPending({
  className,
}: HTMLAttributes<HTMLElement>) {
  const { taskState } = useContext(TaskContext)!;
  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-items-center">
        <CardTitle>Tarefas Pendentes</CardTitle>
        <Timer className="ml-auto" width={16} />
      </CardHeader>
      <CardContent>
        <CardDescription className="">
          Tarefas que ainda precisa ser feitas.
        </CardDescription>
        <p className="text-base sm:text-lg font-bold">
          {taskState.filter((task) => task.status === "pending").length} tarefas
          pendentes
        </p>
      </CardContent>
    </Card>
  );
}
