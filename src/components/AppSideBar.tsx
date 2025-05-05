"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { CheckSquare, Clipboard } from "lucide-react";

export default function AppSidebar() {
  const { taskState } = useContext(TaskContext)!;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            Tarrefas Concluídas {""}
            <CheckSquare size={15} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {taskState
                .filter((task) => task.status === "done")
                .map((task) => (
                  <SidebarMenuItem key={task.id}>
                    <SidebarMenuButton className="cursor-pointer" asChild>
                      <div className="flex items-center space-x-2">
                        <Clipboard size={20} />
                        {task.name}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="flex items-center gap-2">
            Tarrefas Não Concluídas {""}
            <CheckSquare size={15} />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {taskState
                .filter((task) => task.status === "pending")
                .map((task) => (
                  <SidebarMenuItem key={task.id}>
                    <SidebarMenuButton className="cursor-pointer" asChild>
                      <div className="flex items-center space-x-2">
                        <Clipboard size={20} />
                        {task.name}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
