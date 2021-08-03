import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import * as R from "ramda";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user) {
      const domain = user.email ? R.split("@", user.email)[1] : "";
      const isAllowedToSignIn = domain === "ministryofprogramming.com";
      if (isAllowedToSignIn) {
        return true;
      }
      return "/500";
    },
  },
});
