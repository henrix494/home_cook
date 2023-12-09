import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
interface User {
  id: string;
  username: string;
  password: string;
}
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
      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ): Promise<User | null> {
        const { rows } =
          await sql`SELECT * FROM users where Name = ${credentials?.username}`;
        console.log(credentials);
        if (
          credentials?.username === rows[0].name &&
          credentials?.password === rows[0].password
        ) {
          return rows[0] as User;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/signIn" },
};
