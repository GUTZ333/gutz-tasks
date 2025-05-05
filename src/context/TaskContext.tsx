"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import ITasks from "@/types/tasks";
import { Actions } from "@/types/actions";
import ITaskContext from "./types/taskcontext";

export const TaskContext = createContext<ITaskContext | undefined>(undefined);

const taskReducer = (state: ITasks[], action: Actions): ITasks[] => {
  switch (action.type) {
    case "ADD": {
      const newTask: ITasks = {
        id: state.length + 1,
        name: action.payload.name,
        desc: action.payload.desc,
        status: "pending",
      };
      return [...state, newTask];
    }
    case "TOGGLE": {
      const { name } = action.payload;
      return state.map((task) =>
        task.name === name
          ? { ...task, status: task.status === "done" ? "pending" : "done" }
          : task
      );
    }
    case "RM": {
      const { name } = action.payload;
      return state.filter((task) => task.name !== name);
    }
    default:
      return state;
  }
};

export default function TaskContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [taskStorage, setTaskStorage] = useState<ITasks[] | null>(null);
  const [hydrated, setHydrated] = useState(false); // para evitar erro de hydration

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storage = localStorage.getItem("tasks");
      if (storage !== null) {
        setTaskStorage(JSON.parse(storage));
      } else {
        setTaskStorage(null);
      }
      setHydrated(true);
    }
  }, []);

  const initialTaskState: ITasks[] = taskStorage !== null ? taskStorage : [];
  const [taskState, dispatch] = useReducer(taskReducer, initialTaskState);

  // Só salva no localStorage se houver tarefas
  useEffect(() => {
    setTaskStorage(taskState);
  }, [taskState]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskState));
  }, [taskStorage]);

  // ⚠️ Removido o removeItem automático que quebrava tudo
  useEffect(() => localStorage.removeItem("tasks"), []);

  if (!hydrated) return null; // espera até carregar localStorage

  return (
    <TaskContext.Provider value={{ taskState, dispatch, taskStorage }}>
      {children}
    </TaskContext.Provider>
  );
}
