"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useRef,
  useState, // Mantenha useState para o isDataLoaded
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
  const [taskState, dispatch] = useReducer(taskReducer, []);
  const isMounted = useRef(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const taskStorage = localStorage.getItem("tasks");
      if (taskStorage) {
        setIsNewUser(false);
        dispatch({ type: "INIT", payload: { tasks: JSON.parse(taskStorage) } });
      }
    }
    setIsDataLoaded(true);
  }, []);
  useEffect(() => {
    if (isMounted.current) {
      localStorage.setItem("tasks", JSON.stringify(taskState));
      setIsNewUser(false);
    } else {
      isMounted.current = true;
    }
  }, [taskState]);

  if (!isDataLoaded) return null;

  return (
    <TaskContext.Provider value={{ taskState, dispatch, isNewUser }}>
      {children}
    </TaskContext.Provider>
  );
}
