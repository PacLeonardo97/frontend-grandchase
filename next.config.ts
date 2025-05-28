import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
  webpack: (config) => {
    // Attempted fix for "The generated code contains 'async/await' because this module is using "topLevelAwait"."
    // NOTE: Doesn't change anything really
    /*if (config.target instanceof Array && config.target.includes("es5")) {
            config.target = ["web", "es6"];
        } else if (typeof config.target === "string" && config.target.startsWith("node")) {
            config.target = "node22.5";
        }*/
    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
};

export default withNextIntl(nextConfig);
