"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "./ui/button";

export default function NotFound() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8 text-center">
        <h1 className="text-9xl font-extrabold">
          404
        </h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold">
          This Page {pathname.replace(/^\/+/, "")} not found.
        </p>
        <p className="mt-2 text-lg">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" passHref>
          <Button className="mt-8 px-6 py-3">Back to home page</Button>
        </Link>
      </div>
    </>
  )
}