import { Actions } from "@/types/actions";
import ITasks from "@/types/tasks";
import { Dispatch } from "react";

export default interface ITaskContext {
  taskState: ITasks[];
  dispatch: Dispatch<Actions>;
  isNewUser: boolean;
  isLoading: boolean;
}
