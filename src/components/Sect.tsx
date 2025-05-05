import { HTMLAttributes, ReactNode } from "react";

interface ISectProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export default function Sect({ children, className }: ISectProps) {
  return <section className={className}>{children}</section>;
}
  