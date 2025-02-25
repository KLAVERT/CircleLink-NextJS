import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import type { WebpackConfigContext } from "next/dist/server/config-shared";
import type { Configuration } from "webpack";

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const config: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ["@mui/icons-material", "lodash", "date-fns"]
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  webpack: (
    config: Configuration,
    { dev, isServer }: WebpackConfigContext
  ): Configuration => {
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            default: false,
            vendors: false,
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              reuseExistingChunk: true,
            },
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
          },
        },
      };
    }

    if (!config.resolve) {
      config.resolve = {};
    }
    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };

    return config;
  },
  poweredByHeader: false,
  compress: true,
};

export default withNextIntl(config);
