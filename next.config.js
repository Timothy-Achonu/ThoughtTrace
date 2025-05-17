/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Find the existing rule for SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // Push new rules: one for ?url imports, one for component imports
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer, // only JS/TS files
        resourceQuery: { not: [/url/] }, // exclude url imports
        use: ["@svgr/webpack"],
      }
    );

    // Exclude *.svg from the default file loader
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
