import { getServerSession, type NextAuthOptions } from "next-auth";
// import Credentials from "node_modules/next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials";
import { userService } from "./services/userService";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && account.type === "credentials") {
        //(2)
        token.userId = account.providerAccountId; // this is Id that coming from authorize() callback
      }
      return token;
    },
    async session({ session, token, user }) {
      session.user.id = token.userId; //(3)
      return session;
    },
  },
  pages: {
    signIn: "/login", //(4) custom signin page path
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        return userService.authenticate(username, password); //(5)
      },
    }),
  ],
  session: {
    jwt: true, // Enable JWT sessions
    encryption: true, // Enable encryption
    signingKey:
      "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNDg4NDg2NywiaWF0IjoxNzA0ODg0ODY3fQ.fmg9L1Fm8R72NFrRNcP3NcRFyEpsftweUNPq08XANjs", // Should match the key used during token signing
  },
  secret: "cyberaakash", // This should be a strong, unique secret
};

export const getServerAuthSession = () => getServerSession(authOptions); //(6)
