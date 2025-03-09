const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:path*",
        destination: "http://psn-rsc.prod.dl.playstation.net/:path*",
      },
      {
        source: "/api/proxy/:path*",
        destination:
          "http://static-resource.np.community.playstation.net/:path*",
      },
    ];
  },
};

export default nextConfig;
