import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/signIn",
  },
});
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
