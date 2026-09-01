import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/leadership/nibedita",
        destination: "/leadership/nibedita-nayak",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
