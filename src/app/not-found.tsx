import "@/app/globals.css"
import NotFound from "@/components/page-not-found"
import { ThemeProvider } from "next-themes"

export default function PageNotFound() {
  return (
    <>
      <ThemeProvider attribute="class" enableSystem defaultTheme="system">
        <NotFound />
      </ThemeProvider >
    </>
  )
}