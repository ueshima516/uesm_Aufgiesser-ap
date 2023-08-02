/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // 以下追加
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
      ignored: /node_modules/,
    }
    return config
  },
}