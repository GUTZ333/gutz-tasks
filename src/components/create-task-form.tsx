"use client";

import clsx from "clsx";
import Image from "next/image";
import Icon from "@/app/favicon.ico"
import { ComponentProps } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import useFormCreateTask from "@/hooks/useFormCreateTask";
import { handleCreateTaskService } from "@/services/create-task.service";
import { redirect } from "next/navigation";

export default function CreateTaskForm({ className, ...props }: ComponentProps<"div">) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useFormCreateTask();

  if (isSubmitSuccessful) {
    redirect(`  /tasks`)
  }

  return <div className={clsx("flex flex-col gap-6", className)} {...props}>
    <form onSubmit={handleSubmit(async ({ titleTask }) => {
      await handleCreateTaskService({ titleTask })
      reset();
    })} noValidate>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 font-medium"
          >
            <div className="flex size-8 items-center justify-center rounded-md">
              <Image src={Icon} alt="track tasks icon" />
            </div>
            <span className="sr-only">Acme Inc.</span>
            <h1 className="text-xl font-bold">Track Task</h1>
          </Link>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-3">
            <Label htmlFor="title">title</Label>
            <div className="flex flex-col gap-1">
              <Input
                {...register("titleTask")}
                id="title"
                type="text"
                placeholder="type the title task..."
              />
              {errors.titleTask && <span className="text-sm text-normal text-red-500">{errors.titleTask?.message}</span>}
            </div>
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "creating..." : "create"}
          </Button>
        </div>
      </div>
    </form>
  </div>
}