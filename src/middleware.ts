import { NextRequest, NextResponse as resp, type MiddlewareConfig } from "next/server";
import { publicRoutes } from "./routes/public/public-routes";

export async function middleware(req: NextRequest) {
  const pathUri = req.nextUrl.pathname
  const pathIsPublicRoute = publicRoutes.find(route => route.path === pathUri)
  const authToken = req.cookies.get("next-auth.session-token")

  if (authToken && pathIsPublicRoute && pathIsPublicRoute.whenAuthenticated === "redirect") {
    const URI = req.nextUrl.clone();
    URI.pathname = "/";
    return resp.redirect(URI)
  }
  else if (!authToken && pathIsPublicRoute || authToken && !pathIsPublicRoute) {
    return resp.next()
  }
  else if (!authToken && !pathIsPublicRoute) {
    const URI = req.nextUrl.clone();
    URI.pathname = "/auth/sign-in";
    return resp.redirect(URI)
  }
  return resp.next();
}

export const config: MiddlewareConfig = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}