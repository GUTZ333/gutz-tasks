// components/ui/hero-section.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { tools } from "@/data/tools";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export default function Section() {
  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-8 overflow-hidden">
      {/* Imagem de Fundo/Gradiente (Simulando o horizonte) */}
      {/* Você pode substituir isso por um SVG, uma imagem PNG/JPG ou um gradiente CSS mais complexo */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0000FF] to-transparent opacity-30 rounded-full blur-3xl transform scale-150"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#4169E1] to-transparent opacity-50 rounded-full blur-3xl transform scale-150 translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-[#191970] to-transparent opacity-80 rounded-full blur-3xl transform scale-150 translate-y-1/3"></div>


      {/* Conteúdo Principal Centralizado */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-6 mt-40">
        {/* Título Principal */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Track Tasks
        </h1>

        {/* Subtítulo/Descrição */}
        <p className="text-lg text-gray-400 max-w-2xl">
          This software is a basic task manager made in Next JS and backend with the framework Nest JS. This software has an authentication flow and requirement with database and JWT for creation and management of your tasks
        </p>

        {/* Formulário de E-mail */}
        <Link href="/auth/sign-up">
          <Button type="submit">
            Get Started
          </Button>
        </Link>

        {/* Mensagem Inferior */}
        <p className="text-sm text-gray-500 pt-2">
          Free and open source forever.
        </p>
      </div>

      <h1 className="text-3xl font-bold mt-20 text-center">Tools</h1>
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-5 justify-center mt-5">
        {tools.map(({ icon: Icon, name, description }, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-sm font-semibold">
                <Icon size={28} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle>
                {name}
              </CardTitle>
              <CardDescription className="mt-2">
                {description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}