export default interface ITasks {
  id: number | string;
  name: string;
  desc: string;
  status: "pending" | "done";
}
