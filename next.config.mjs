/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "pics-v3.venmo.com",
      },
    ],
  },
};

export default nextConfig;
