export const publicRoutes = [
  {
    path: "/auth/sign-up",
    whenAuthenticated: "redirect"
  },
  {
    path: "/auth/sign-in",
    whenAuthenticated: "redirect"
  },
  {
    path: "/",
    whenAuthenticated: "next"
  }
] as const;