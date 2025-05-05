import { HTMLAttributes, useContext, useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import clsx from "clsx";
import { TaskContext } from "@/context/TaskContext";
import { schema } from "@/schemas";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default function ArtWelcome({ className }: HTMLAttributes<HTMLElement>) {
  const { taskState, dispatch } = useContext(TaskContext)!;
  const [open, setOpen] = useState<boolean>(false);

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
    setOpen(false);
  };

  return (
    <main className={className}>
      <Card className="w-full max-w-[450px]">
        <CardHeader>
          <CardTitle>Olá, Seja bem vindo à Gutz Tasks</CardTitle>
          <CardDescription>
            Este site foi criado pelo desenvolvedor da Gutz333 como forma de
            treinamento e prática para adaptação as tecnologias que ele irá
            precisar utilizar em sua carreira. Crie uma tarefa abaixo clicando
            no botão de criar tarefa
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                      onClick={() => setOpen(false)}
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
        </CardContent>
        <CardFooter>
          <Button className="cursor-pointer" onClick={() => setOpen(true)}>
            Criar tarefa
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
