import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/terraloom/products/**',
      },
      {
        protocol: 'https',
        hostname: 'jeredungan.com',
        pathname: '/terraloom/products/**',
      },
    ],
  },
};

export default withFlowbiteReact(nextConfig);