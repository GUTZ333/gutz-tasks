import ITasks from "./tasks";

export type Actions =
  | { type: "ADD"; payload: { name: string; desc: string } }
  | { type: "TOGGLE"; payload: { name: string } }
  | { type: "RM"; payload: { name: string } }
  | { type: "INIT"; payload: { tasks: ITasks[] } };
