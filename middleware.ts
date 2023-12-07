import { withAuth } from "next-auth/middleware";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|public|paula.png|natan.png|sw.js).*)",
  ],
};
export default withAuth({
  pages: {
    signIn: "/signIn",
  },
});
