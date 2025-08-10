"use client";

import { ArrowUpDown, CircleCheck, InfoIcon, Loader, MoreHorizontal } from "lucide-react";
import { ITasksDataTable } from "./page";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { taskComplete } from "@/services/task-complete.service";
import { deleteTask } from "@/services/delete-task.service";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar"
import { useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { editTitleTask } from "@/services/edit-title-task.service";


export const columns: ColumnDef<ITasksDataTable>[] = [
  {
    accessorKey: "taskTitle",
    header: ({ column }) => <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
      title
      <ArrowUpDown width={18} />
    </Button>,
    cell: ({ row }) => {
      const taskTitle = row.original.taskTitle;
      return <p className="text-sm text-normal max-md:truncate max-md:max-w-[180px]">{taskTitle}</p>
    }
  },
  {
    accessorKey: "taskIsDone",
    header: () => <div className="flex items-center gap-2"><h1>Status</h1><InfoIcon width={18} /></div>,
    cell: ({ row }) => {
      const taskIsDone = row.original.taskIsDone
      return <>
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {taskIsDone ? <><CircleCheck width={18} className="fill-green-500 dark:fill-green-400" /> <h1 className="text-sm font-semibold ">Done</h1></> : <> <Loader width={18} /> <h1 className="text-sm font-semibold "> Pending</h1> </>}

        </Badge>
      </>

    }
  },
  {
    accessorKey: "taskId",
    header: () => <h1 className="text-sm font-semibold">Id</h1>,
    cell: ({ row }) => <p className="text-sm text-normal">{row.original.taskId}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const titleTask = row.original.taskTitle
      const taskIsDone = row.original.taskIsDone
      const taskCreatedAt = row.original.taskCreatedAt
      const taskUpdatedAT = row.original.taskUpdateAt

      const [openDialogDateCreatedTask, setOpenDialogDateCreatedTask] = useState<boolean>(false)
      const [openDialogDateUpdatedTask, setOpenDialogDateUpdatedAt] = useState<boolean>(false)
      const [openPopoverEditTitleTask, setOpenPopoverEditTitleTask] = useState<boolean>(false)

      const inpRef = useRef<HTMLInputElement>(null)

      return (
        <>
          <DropdownMenu >
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Actions</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(titleTask)}
              >
                Copy task title
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={async () => {
                await deleteTask({ titleTask })
              }}>
                Delete this task.
              </DropdownMenuItem>
              {!taskIsDone && <DropdownMenuItem onClick={async () => {
                await taskComplete({ taskTitle: titleTask }, { taskIsDone: true })
              }}>
                mark as complete
              </DropdownMenuItem>}

              <DropdownMenuItem onClick={() => {
                setTimeout(() => {
                  setOpenPopoverEditTitleTask(true)
                }, 100);
              }}>
                edit the title task
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => {
                setOpenDialogDateCreatedTask(true)
              }}>
                date created
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => {
                setOpenDialogDateUpdatedAt(true)
              }}>
                date updated
              </DropdownMenuItem>

              <Link href={`/tasks/${titleTask}`}>
                <DropdownMenuItem>
                  enter in task
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={openDialogDateCreatedTask} onOpenChange={setOpenDialogDateCreatedTask} >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Data created of task</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center w-full">
                <Calendar month={new Date(taskCreatedAt)} disabled={() => true} fromMonth={new Date(taskCreatedAt)} toMonth={new Date(taskCreatedAt)} mode="single" selected={new Date(taskCreatedAt)} className="rounded-lg border" />
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={openDialogDateUpdatedTask} onOpenChange={setOpenDialogDateUpdatedAt}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Data updated of task</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center w-full">
                <Calendar month={new Date(taskUpdatedAT)} disabled={() => true} fromMonth={new Date(taskUpdatedAT)} toMonth={new Date(taskUpdatedAT)} mode="single" selected={new Date(taskUpdatedAT)} className="rounded-lg border" />
              </div>
            </DialogContent>
          </Dialog>

          <Popover open={openPopoverEditTitleTask} onOpenChange={setOpenPopoverEditTitleTask}>
            <PopoverTrigger asChild>
              <div className="absolute" />
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="leading-none font-medium">Edit Title Task</h4>
                  <p className="text-muted-foreground text-sm">
                    fill in the field below the new name you want to give this task.
                  </p>
                </div>
                <div className="grid gap-2">
                  <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="width">Title</Label>
                    <Input
                      ref={inpRef}
                      onKeyDown={async ({ key }) => {
                        if (key === "Enter") {
                          await editTitleTask({ taskTitle: titleTask, newTaskTitle: inpRef.current?.value as string });
                          setOpenPopoverEditTitleTask(false)
                        }
                      }}
                      id="width"
                      defaultValue={titleTask}
                      className="col-span-2 h-8"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )
    },
    enableSorting: false,
    enableHiding: false,
  }
]