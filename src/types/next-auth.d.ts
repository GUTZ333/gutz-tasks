import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

// Estendendo o Session
declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      userId: string;
      userName: string;
      userEmail: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    userId: string;
    userName: string;
    userEmail: string;
    accessToken: string;
    refreshToken: string;
  }
}

// Estendendo o JWT
declare module "next-auth/jwt" {
  interface JWT {
    userId: string;
    userName: string;
    userEmail: string;
    accessToken: string;
    refreshToken: string;
    // accessTokenExp: number;
  }
}
