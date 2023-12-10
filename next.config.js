/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  headers: () => [
    {
      source: "https://home-cook-henrix494.vercel.app/",
      headers: [{ key: "Cache-Control", value: "no-store" }],
    },
  ],
};

module.exports = nextConfig;
