"use client";

import { deleteTask } from "@/services/delete-task.service";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function AlertDialogDeleteTask({ taskTitle }: { taskTitle: string }) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            <Trash2 width={20} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>If you click on the delete button, this task will be dead and will not get rid of this action. If you really do not want to delete, click cancel.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              await deleteTask({ titleTask: taskTitle })
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}