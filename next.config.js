/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};

module.exports = nextConfig;
