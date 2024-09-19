const withPWAInit = require("next-pwa");

const isDev = process.env.NODE_ENV !== "production";

const withPWA = withPWAInit({
  dest: "public",
  disable: isDev, // Disable PWA in development mode
  register: true, // Ensure service worker registration
  skipWaiting: true, // Skip waiting on service worker updates
  buildExcludes: [
    ({ asset }) => {
      // Exclude server-side assets and specific manifests
      if (
        asset.name.startsWith("server/") ||
        asset.name.match(
          /^((app-|^)build-manifest\.json|react-loadable-manifest\.json)$/
        )
      ) {
        return true;
      }

      // In development mode, exclude everything except runtime assets
      if (isDev && !asset.name.startsWith("static/runtime/")) {
        return true;
      }
      return false;
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for better error handling and debugging
  swcMinify: true, // Enable SWC minification for faster builds
};

module.exports = withPWA(nextConfig);
