import CreateTaskForm from "@/components/create-task-form";

export default function CreateTask() {
  return <div className="bg-background flex min-h-full flex-col items-center justify-center gap-6 p-6 md:p-10">
    <div className="w-full max-w-sm">
      <CreateTaskForm />
    </div>
  </div>
}