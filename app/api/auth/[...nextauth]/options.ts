import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const user = { id: "42", name: "paula", password: "123456" };
        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          console.log("true");
          return user;
        } else {
          console.log("false");
          return null;
        }
      },
    }),
  ],

  pages: { signIn: "/signIn" },
};
