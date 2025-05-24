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
    case "INIT": {
      return action.payload.tasks;
    }
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
  // Estado inicial do reducer: lê do localStorage na primeira renderização
  const [taskState, dispatch] = useReducer(taskReducer, [], (initialArg) => {
    if (typeof window !== "undefined") {
      const taskStorage = localStorage.getItem("tasks");
      if (taskStorage) {
        return JSON.parse(taskStorage) as ITasks[];
      }
    }
    return initialArg; // Retorna o estado inicial vazio se não houver a chave "tasks"
  });

  // Determina se é um novo usuário com base na existência da chave "tasks" no localStorage
  const [isNewUser, setIsNewUser] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tasks") === null;
    }
    return true; // Assume que é um novo usuário no lado do servidor (SSR)
  });

  // Sincroniza o taskState com o localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskState));

    // Se a chave "tasks" existe no localStorage, não é um novo usuário.
    // Isso é importante caso o usuário tenha sido marcado como "novo" (ex: SSR)
    // e depois o localStorage foi lido e a chave existe.
    if (localStorage.getItem("tasks") !== null && isNewUser) {
      setIsNewUser(false);
    }
  }, [taskState, isNewUser]);

  return (
    <TaskContext.Provider value={{ taskState, dispatch, isNewUser }}>
      {children}
    </TaskContext.Provider>
  );
}
