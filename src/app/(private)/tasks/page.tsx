import { getTasks } from "@/services/get-tasks.service";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export interface ITasksDataTable {
  taskId: string;
  taskTitle: string;
  taskIsDone: boolean;
  taskCreatedAt: string;
  taskUpdateAt: string;
}

export default async function Tasks() {
  const data = await getTasks();
  if (!data) return <h1>Dados não carregados.</h1>

  return <DataTable columns={columns} data={data} pageSize={5} />
}