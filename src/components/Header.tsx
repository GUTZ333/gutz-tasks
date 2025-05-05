"use client";

import GutzTasksIcon from "@/app/favicon.ico";
import Image from "next/image";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { HTMLAttributes, useContext, useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { schema } from "@/schemas";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Wrench } from "lucide-react";

export default function Header({ className }: HTMLAttributes<HTMLElement>) {
  const { taskState, dispatch } = useContext(TaskContext)!;
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  type FormData = z.infer<ReturnType<typeof schema>>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema(taskState)) });

  const onSubmit = (data: FormData) => {
    dispatch({ type: "ADD", payload: { name: data.name, desc: data.desc } });
    reset();
    closeModal();
  };

  const { theme, setTheme } = useTheme();

  return (
    <header className={className}>
      <Image src={GutzTasksIcon} alt="Gutz Tasks" width={50} />
      <div className="flex gap-2">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Wrench size={20} />
            </MenubarTrigger>
            <MenubarContent className={clsx()}>
              <MenubarItem
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                Trocar tema{" "}
                {theme === "dark" ? <Moon size={5} /> : <Sun size={5} />}
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem onClick={openModal}>Criar nova tarefa</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={clsx()}>
          <DialogHeader>
            <DialogTitle>Crie uma nova tarefa</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para criar uma tarefa aqui na Gutz
              Manager.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label className="hidden sm:block" htmlFor="inp-name-task">
                Nome
              </Label>
              <Input
                {...register("name")}
                id="inp-name-task"
                className="col-span-4 sm:col-span-3"
                placeholder="digite o nome da tarefa"
              />
            </div>
            {errors.name && (
              <span className="font-normal text-red-500 text-sm sm:ml-30">
                {errors.name.message}
              </span>
            )}
            <div className="grid grid-cols-4 items-center text-right gap-3">
              <Label className="hidden sm:block" htmlFor="inp-desc-task">
                Descrição
              </Label>
              <Input
                {...register("desc")}
                id="inp-desc-task"
                className="col-span-4 mt-2 sm:col-span-3"
                placeholder="Digite a descrição da tarefa"
              />
            </div>
            {errors.desc && (
              <span className="font-normal text-red-500 text-sm sm:ml-30">
                {errors.desc.message}
              </span>
            )}
            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="destructive"
                  className="capitalize cursor-pointer"
                  onClick={closeModal} // Fecha o modal ao clicar no botão
                >
                  cancelar
                </Button>
              </DialogClose>
              <Button type="submit" className="capitalize cursor-pointer">
                criar tarefa
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
