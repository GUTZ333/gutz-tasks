"use client";

import Header from "@/components/Header";
import clsx from "clsx";
import Sect from "@/components/Sect";
import ArtTasks from "@/components/articles/ArtTasks";
import { useTheme } from "next-themes";
import ArtWelcome from "@/components/Welcome";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";

export default function Home() {
  const { theme } = useTheme();
  const { taskState, taskStorage } = useContext(TaskContext)!;

  return (
    <>
      {taskState.length === 0 && taskStorage === null ? (
        <ArtWelcome className="w-full h-screen p-2 flex items-center justify-center" />
      ) : (
        <main
          className={clsx(
            "h-screen w-full text-muted-foreground text-sm p-2",
            theme === "dark" ? "bg-neutral-800" : "bg-neutral-50"
          )}
        >
          <Header
            className={clsx(
              "w-full max-h-[12%] border-b flex items-center justify-between p-2"
            )}
          />
          <Sect className="w-full h-screen max-h-[85%] flex justify-center items-center">
            <ArtTasks className={clsx("p- w-full max-w-[500px]")} />
          </Sect>
        </main>
      )}
    </>
  );
}
