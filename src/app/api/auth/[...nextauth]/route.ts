import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return "/";
    },
  },
  pages: {
    signIn: "/signin",
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };
