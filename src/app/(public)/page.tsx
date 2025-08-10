import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/navbar";
import Section from "@/components/section";
import { getServerSession } from "next-auth";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import SelectTheme from "@/components/button-theme";
import { getTasks } from "@/services/get-tasks.service";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CircleCheck, ClipboardList, Loader, Plus } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession();
  const tasks = await getTasks();

  return (
    <>
      {session && tasks ? (
        <>
          <SidebarProvider>
            <AppSidebar />
            <main className="min-h-screen p-3 w-full">
              <SidebarInset>
                <header className="flex w-full h-16 shrink-0 items-center gap-2 border-b px-4">
                  <SidebarTrigger />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem className="hidden md:block">
                        <BreadcrumbLink href="#">
                          Building Your Application
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                  <SelectTheme className="ml-auto" />
                </header>

                {!tasks.length ? (
                  <Card className="px-4 lg:px-6 mt-4
  *:data-[slot=card]:from-primary/5
  *:data-[slot=card]:to-card 
  *:data-[slot=card]:bg-gradient-to-t 
  *:data-[slot=card]:shadow-xs 
  dark:*:data-[slot=card]:bg-card">
                    <CardHeader>
                      <CardTitle>
                        No tasks found
                      </CardTitle>
                      <CardDescription>
                        You haven’t created any tasks yet. Let’s fix that!
                      </CardDescription>
                      <CardAction>
                        <Link href="/tasks/create">
                          <Button variant="outline">
                            <Plus size={25} />
                          </Button>
                        </Link>
                      </CardAction>
                    </CardHeader>
                    <CardFooter>
                      <CardTitle>
                        click the button above to create a task
                      </CardTitle>
                    </CardFooter>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 lg:px-6 mt-4
  *:data-[slot=card]:from-primary/5 
  *:data-[slot=card]:to-card 
  *:data-[slot=card]:bg-gradient-to-t 
  *:data-[slot=card]:shadow-xs 
  dark:*:data-[slot=card]:bg-card">
                    <Suspense fallback={<Skeleton />}>
                      <Card className="@container/card col-span-2">
                        <CardHeader>
                          <CardDescription>
                            Total tasks
                          </CardDescription>
                          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {tasks.length}
                          </CardTitle>
                          <CardAction>
                            <ClipboardList size={25} />
                          </CardAction>
                        </CardHeader>
                        <CardContent>
                          <CardTitle>
                            total number of tasks you created
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </Suspense>
                    <Suspense fallback={<Skeleton />}>
                      <Card className="@container/card">
                        <CardHeader>
                          <CardDescription>
                            Total completed tasks
                          </CardDescription>
                          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {tasks.filter(task => task.taskIsDone).length}
                          </CardTitle>
                          <CardAction>
                            <CircleCheck size={25} />
                          </CardAction>
                        </CardHeader>
                        <CardContent>
                          <CardTitle>
                            total number of tasks you completed
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </Suspense>
                    <Suspense fallback={<Skeleton />}>
                      <Card className="@container/card">
                        <CardHeader>
                          <CardDescription>
                            Total pending tasks
                          </CardDescription>
                          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                            {tasks.filter(task => !task.taskIsDone).length}
                          </CardTitle>
                          <CardAction>
                            <Loader size={25} />
                          </CardAction>
                        </CardHeader>
                        <CardContent>
                          <CardTitle>
                            total number of tasks you still need to complete
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </Suspense>
                    <Carousel className="w-full mx-auto col-span-2">
                      <CarouselContent>
                        {tasks.map(task => (
                          <CarouselItem key={task.taskId}>
                            <div className="p1">
                              <Card>
                                <CardHeader>
                                  <CardTitle className="text-sm font-semibold">
                                    {task.taskTitle}
                                  </CardTitle>
                                  <CardDescription className="text-xs text-muted-foreground">
                                    Created at: {new Date(task.taskCreatedAt).toLocaleDateString()}
                                  </CardDescription>
                                  <CardDescription className="text-xs text-muted-foreground">
                                    Updated at: {new Date(task.taskUpdateAt).toLocaleDateString()}
                                  </CardDescription>
                                  <CardAction>
                                    <Button className="">
                                      <Link href={`/tasks/${task.taskTitle}`}>
                                        View Details
                                      </Link>
                                    </Button>
                                  </CardAction>
                                </CardHeader>
                                <CardContent className="flex items-center gap-2">
                                  <p className="text-xs text-muted-foreground">
                                    Status:
                                  </p>
                                  {task.taskIsDone ? <CheckCircle /> : <Loader />}
                                </CardContent>
                              </Card>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                )}
              </SidebarInset>
            </main>
          </SidebarProvider>
        </>
      ) : (
        <>
          <div className="flex flex-col min-h-24">
            <Navbar />
            <Section />
          </div>
        </>
      )
      }
    </>
  );
}

