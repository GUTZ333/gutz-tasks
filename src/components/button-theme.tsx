"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";
import { SelectHTMLAttributes } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function SelectTheme({ className }: SelectHTMLAttributes<HTMLSelectElement>) {
  const { theme, setTheme } = useTheme();
  return (
    <Select value={theme} onValueChange={() => setTheme(currentTheme => currentTheme === "dark" ? "light" : "dark")}>
      <SelectTrigger className={className}>
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light"><span className="hidden md:block">Light</span> <Sun /></SelectItem>
        <SelectItem value="dark"><span className="hidden md:block">Dark</span> <Moon /> </SelectItem>
      </SelectContent>
    </Select>
  )
}