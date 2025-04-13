import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user:
          | Record<"id" | "name" | "email" | "image" | "role", string>
          | any = {
          id: "56e6f7a034f9419c", // sha256 of "1"
          name: "somwan",
          email: "somwan@gmail.com",
          image: "https://logodix.com/logo/649370.png",
          role: "admin",
        };

        return email === "somwan@gmail.com" && password === "12345678"
          ? user
          : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("email" in token) session.user.email = token.email;
      if ("name" in token) session.user.name = token.name;
      if ("role" in token) session.user.role = token.role;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
