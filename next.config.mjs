/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        config.externals.push({ canvas: 'commonjs canvas' })
        return config
      },
};

export default nextConfig;
