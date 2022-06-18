/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      process: false,
      buffer: false,
      os: false,
    };
    config.resolve.alias = {
      ...config.resolve.alias,
      // fixes next-mdx-remote: Package path ./jsx-runtime.js is not exported from package react
      // https://github.com/hashicorp/next-mdx-remote/issues/237
      'react/jsx-runtime.js': require.resolve('react/jsx-runtime'),
    };

    return config;
  },
  async redirects() {
    return [
      {
        source: '/javascript-array-prototype-methods-from-explained',
        destination: '/blog/javascript-array-methods-from-explained',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-from-explained',
        destination: '/blog/javascript-array-methods-from-explained',
        permanent: true,
      },
      {
        source: '/javascript-array-prototype-methods-isarray-explained',
        destination: '/blog/javascript-array-methods-isarray-explained',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-isarray-explained',
        destination: '/blog/javascript-array-methods-isarray-explained',
        permanent: true,
      },
      {
        source: '/javascript-fundamentals-functions-overview',
        destination: '/blog/javascript-fundamentals-functions-overview',
        permanent: true,
      },
      {
        source: '/javascript-fundamentals-getters-setters',
        destination: '/blog/javascript-fundamentals-getters-setters',
        permanent: true,
      },
      {
        source: '/finding-updating-outdated-npm-packages',
        destination: '/blog/finding-updating-outdated-npm-packages',
        permanent: true,
      },
      {
        source: '/gatsby-blog-open-graph-image',
        destination: '/blog/gatsby-blog-open-graph-image',
        permanent: true,
      },
      {
        source: '/changing-vscode-menu-bar-colour',
        destination: '/blog/changing-vscode-menu-bar-colour',
        permanent: true,
      },
      {
        source: '/deleting-files-node-js-promises',
        destination: '/blog/deleting-files-node-js-promises',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-of-explained',
        destination: '/blog/javascript-array-methods-of-explained',
        permanent: true,
      },
      {
        source: '/gatsby-mdx-blog-rss-feed',
        destination: '/blog/gatsby-mdx-blog-rss-feed',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-prototype-concat-explained',
        destination:
          '/blog/javascript-array-methods-prototype-concat-explained',
        permanent: true,
      },
      {
        source: '/optimising-google-fonts-gatsby-increased-performance',
        destination:
          '/blog/optimising-google-fonts-gatsby-increased-performance',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-prototype-copywithin-explained',
        destination:
          '/blog/javascript-array-methods-prototype-copywithin-explained',
        permanent: true,
      },
      {
        source: '/netlify-redirects-gatsby-website',
        destination: '/blog/netlify-redirects-gatsby-website',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-prototype-entries-explained',
        destination:
          '/blog/javascript-array-methods-prototype-entries-explained',
        permanent: true,
      },
      {
        source: '/gatsby-develop-npm-run-develop',
        destination: '/blog/gatsby-develop-npm-run-develop',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-prototype-every-explained',
        destination: '/blog/javascript-array-methods-prototype-every-explained',
        permanent: true,
      },
      {
        source: '/javascript-array-methods-prototype-fill-explained',
        destination: '/blog/javascript-array-methods-prototype-fill-explained',
        permanent: true,
      },
      {
        source: '/Javascript-Fundamentals-Getters-Setters',
        destination: '/blog/javascript-fundamentals-getters-setters',
        permanent: true,
      },
      {
        source: '/JavaScript-Fundamentals-Functions-Overview',
        destination: '/blog/javascript-fundamentals-functions-overview',
        permanent: true,
      },
      {
        source: '/notes',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/notes/javascript/prototypal-inheritance',
        destination: '/blog/prototypal-inheritance-overview',
        permanent: true,
      },
      {
        source: '/notes/javascript/higher-order-functions',
        destination: '/blog/javascript-higher-order-functions-overview',
        permanent: true,
      },
      {
        source: '/notes/javascript/first-class-functions',
        destination: '/blog/javascript-first-class-functions-overview',
        permanent: true,
      },
      {
        source: '/blog/other',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/blogging',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/blog/web-development',
        destination: '/blog?q=development',
        permanent: true,
      },
      {
        source: '/notes/javascript',
        destination: '/blog?q=javascript',
        permanent: true,
      },
      {
        source: '/javascript-higher-order-functions-overview',
        destination: '/blog/javascript-higher-order-functions-overview',
        permanent: true,
      },
      {
        source: '/gatsbyjs-pagination-tutorial',
        destination: '/blog/gatsbyjs-pagination-tutorial',
        permanent: true,
      },
      {
        source: '/content-creation-workflow-overview',
        destination: '/blog/content-creation-workflow-overview',
        permanent: true,
      },
      {
        source: '/truthy-falsy-values-explained',
        destination: '/blog/truthy-falsy-values-explained',
        permanent: true,
      },
      {
        source: '/three-tools-increase-productivity',
        destination: '/blog/three-tools-increase-productivity',
        permanent: true,
      },
      {
        source: '/five-ways-improve-writing-developer',
        destination: '/blog/five-ways-improve-writing-developer',
        permanent: true,
      },
      {
        source: '/open-graph-twitter-meta-tags-missing-gatsbyjs-production',
        destination: '/blog/open-graph-twitter-meta-tags-missing-gatsbyjs-production',
        permanent: true,
      },
      {
        source: '/installing-mutliple-nodejs-versions-nvm',
        destination: '/blog/installing-mutliple-nodejs-versions-nvm',
        permanent: true,
      },
      {
        source: '/custom-email-signup-form-conertkit-gatsbyjs',
        destination: '/blog/custom-email-signup-form-conertkit-gatsbyjs',
        permanent: true,
      },
      {
        source: '/maximising-blog-post-impressions-cross-posting-correct-way',
        destination: '/blog/maximising-blog-post-impressions-cross-posting-correct-way',
        permanent: true,
      },
      {
        source: '/css-animation-overview',
        destination: '/blog/css-animation-overview',
        permanent: true,
      },
      {
        source: '/3-reasons-why-you-need-design-components-not-pages',
        destination: '/blog/3-reasons-why-you-need-design-components-not-pages',
        permanent: true,
      },
      {
        source: '/css-keyframes-overview',
        destination: '/blog/css-keyframes-overview',
        permanent: true,
      }
    ];
  },
};

module.exports = nextConfig;
