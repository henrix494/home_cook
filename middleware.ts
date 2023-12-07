import { withAuth } from "next-auth/middleware";
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login).*)",
    "/partner/:path*",
  ],
};
export default withAuth({
  pages: {
    signIn: "/signIn",
  },
});
