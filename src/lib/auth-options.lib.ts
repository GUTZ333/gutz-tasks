import { envs } from "@/schemas/envs.schema";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userEmail: { label: "userEmail", type: "email" },
        userPassword: { label: "userPassword", type: "password" },
      },
      async authorize(credentials) {
        const response = await fetch(`${envs.BACKEND_URI}/auth/sign-in`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            userEmail: credentials?.userEmail,
            userPassword: credentials?.userPassword,
          })
        })

        if (!response.ok) {
          const data = await response.json();
          return Promise.reject(new Error(data.message || "Failed to sign in"));
        }

        const { acessToken, refreshToken, account: { userId, userName, userEmail } } = await response.json();

        return {
          id: userId,
          userId,
          userName,
          userEmail,
          accessToken: acessToken,
          refreshToken
        }
      }
    })
  ],
  callbacks: {
    redirect({ url, baseUrl }) {
      const isAuthError = url.includes("error=")
      if (isAuthError) return url;
      return baseUrl
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      session.user.userId = token.userId;
      session.user.userName = token.userName;
      session.user.userEmail = token.userEmail;

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.userId;
        token.userName = user.userName;
        token.userEmail = user.userEmail;
        return token
      }

      const decodeToken = jwtDecode(token.accessToken) as { exp: number }
      const tokenIsExpired = Date.now() >= decodeToken.exp * 1000
      if (!tokenIsExpired) return token;

      try {
        const request = await fetch(`${envs.BACKEND_URI}/auth/refresh`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            refreshToken: token.refreshToken
          })
        })

        if (!request.ok) throw new Error("Erro ao renovar o token.")
        const { accessToken, refreshToken } = await request.json();
        token.accessToken = accessToken,
          token.refreshToken = refreshToken
        return token
      }
      catch (err) {
        if (err instanceof Error) console.log("erro ao retornar token: ", err)
      }
      return token
    }
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  secret: envs.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/sign-in",
  },
}