import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      name: string;
      image: string;
      balance: number;
    };
  }
}
