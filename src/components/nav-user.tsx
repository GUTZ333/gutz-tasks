"use client"

import {
  ChevronsUpDown, LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { signOut, useSession } from "next-auth/react"
import { useTheme } from "next-themes"
import { Skeleton } from "./ui/skeleton"

export default function NavUser() {
  const { isMobile } = useSidebar()
  const session = useSession();
  const { setTheme, theme } = useTheme();

  if (session.status === "loading") return <div className="flex items-center gap-3 p-2">
    <Skeleton className="h-10 w-10 rounded-full" />
    <div className="space-y-1">
      <Skeleton className="h-4 w-[120px]" />
      <Skeleton className="h-3 w-[80px]" />
    </div>
  </div>
  if (!session.data?.user) return
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarFallback className="bg-muted rounded-full"><User /></AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{session.data.user.userName}</span>
                <span className="truncate text-xs">{session.data.user.userEmail}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarFallback className="rounded-full">
                    <User />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{session.data.user.userName}</span>
                  <span className="truncate text-xs">{session.data.user.userEmail}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { setTheme(currentTheme => currentTheme === "light" ? "dark" : "light") }}>
              {theme === "dark" ? <Sun /> : <Moon />} toogle theme
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => await signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}