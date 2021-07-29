import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import api from "../../../lib/api";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session(session) {
      const user = await api.getUser(session.user.email);
      const balance =
        user?.properties.balance.type === "number"
          ? user?.properties.balance.number
          : 0;
      return {
        ...session,
        user: {
          ...session.user,
          balance,
        },
      };
    },
  },
});
