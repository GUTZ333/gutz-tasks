"use client";

import Header from "@/components/Header";
import clsx from "clsx";
import Sect from "@/components/Sect";
import ArtTasks from "@/components/articles/ArtTasks";
import { useTheme } from "next-themes";
import ArtWelcome from "@/components/Welcome";
import { Suspense, useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import ArtTasksComplete from "@/components/articles/ArtTasksComplete";
import ArtTasksPending from "@/components/articles/ArtTasksPending";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { theme } = useTheme();
  const { isNewUser, isLoading } = useContext(TaskContext)!;
  if (isLoading) return null;

  return (
    <>
      {isNewUser === true ? (
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
          <Sect className="grid md:grid-cols-3 grid-cols-1 gap-2 justify-items-center mt-4">
            <Suspense fallback={<Skeleton className="w-full max-w-[500px]" />}>
              <ArtTasks className={clsx("p-2 w-full max-w-[500px]")} />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full max-w-[420px]" />}>
              <ArtTasksComplete className={clsx("w-full max-w-[420px]")} />
            </Suspense>
            <Suspense fallback={<Skeleton className="w-full max-w-[420px]" />}>
              <ArtTasksPending className={clsx("w-full max-w-[420px]")} />
            </Suspense>
          </Sect>
        </main>
      )}
    </>
  );
}
