const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=600, stale-while-revalidate=300",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
