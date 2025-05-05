import ITasks from "./tasks";

export type Actions =
  | {
      type: "ADD";
      payload: { name: ITasks["name"]; desc: ITasks["desc"] };
    }
  | {
      type: "RM";
      payload: { name: ITasks["name"] };
    }
  | {
      type: "TOGGLE";
      payload: { name: ITasks["name"] };
    };
