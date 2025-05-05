import React, { HTMLAttributes, ReactNode, useContext, useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import { ColumnDef } from "@tanstack/react-table";
import ITasks from "@/types/tasks";
import { ArrowUpDown, Check, Hourglass } from "lucide-react";
import DataTable from "../ui/data-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ArtTasks({ className }: HTMLAttributes<HTMLElement>) {
  const { taskState, dispatch } = useContext(TaskContext)!;
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const columns: ColumnDef<ITasks>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => {
        return <div>{row.getValue("id")}</div>;
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div>{row.getValue("name")}</div>;
      },
    },
    {
      accessorKey: "desc",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Descrição <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return <div className="max-w-sm truncate">{row.getValue("desc")}</div>;
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            className="cursor-pointer"
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            status <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as ReactNode;
        return (
          <div className="flex items-center gap-1 ">
            {status === "pending" ? (
              <Hourglass size={11.5} />
            ) : (
              <Check size={11.5} />
            )}
            {status}
          </div>
        );
      },
    },
    {
      id: "ações",
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() =>
                  dispatch({ type: "RM", payload: { name: task.name } })
                }
              >
                Deletar tarefa
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() =>
                  dispatch({ type: "TOGGLE", payload: { name: task.name } })
                }
              >
                {task.status === "done" ? "Desmarcar" : "Marcar"} como concluída
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTimeout(() => setOpenDialog(true), 0)}
              >
                Ver descrição da tarefa
              </DropdownMenuItem>
            </DropdownMenuContent>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{task.name}</DialogTitle>
                  <DialogDescription>{task.desc}</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <article className={className}>
      <DataTable
        columns={columns}
        data={taskState}
        pageSize={3}
        searchPlaceholder="filter tasks..."
      />
    </article>
  );
}
