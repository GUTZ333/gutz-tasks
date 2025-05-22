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
  const initialState: ITasks[] = [];
  const [taskState, dispatch] = useReducer(taskReducer, initialState);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const taskStorage = localStorage.getItem("tasks");
    if (taskStorage !== null) {
      const parsedTasks = JSON.parse(taskStorage);
      dispatch({ type: "INIT", payload: { tasks: parsedTasks as ITasks[] } });
      setIsNewUser(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskState));
  }, [taskState]);

  return (
    <TaskContext.Provider value={{ taskState, dispatch, isNewUser, isLoading }}>
      {children}
    </TaskContext.Provider>
  );
}
