import {
  SiNextdotjs,
  SiNestjs,
  SiTypeorm,
  SiJsonwebtokens,
  SiMysql,
  SiTypescript,
  SiReact,
  SiNextdotjs as SiNextauth,
  SiTailwindcss, 
} from "react-icons/si";

export const tools = [
  {
    name: "Next.js",
    icon: SiNextdotjs,
    description: "React framework for building interfaces with hybrid rendering.",
  },
  {
    name: "NestJS",
    icon: SiNestjs,
    description: "Node.js framework for creating scalable APIs with TypeScript.",
  },
  {
    name: "TypeORM",
    icon: SiTypeorm,
    description: "ORM for mapping and managing relational databases.",
  },
  {
    name: "JWT",
    icon: SiJsonwebtokens,
    description: "Token-based authentication for secure sessions.",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    description: "Relational database used to store structured data.",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    description: "A superset of JavaScript that adds static typing.",
  },
  {
    name: "Shadcn UI",
    icon: SiReact, // No official icon for Shadcn UI, using React as placeholder
    description: "UI library based on Radix UI and Tailwind CSS, highly customizable.",
  },
  {
    name: "NextAuth.js",
    icon: SiNextauth,
    description: "Authentication library for Next.js apps with JWT support.",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    description: "Utility-first CSS framework for building responsive interfaces.",
  }
] as const;
