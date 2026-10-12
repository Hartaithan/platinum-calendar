import { readFileSync } from "node:fs";

const { version } = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const nextConfig = {
  env: { APP_VERSION: version },
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
