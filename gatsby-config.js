/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "bookStore",
    menuLinks: [
      {
        name: "home",
        link: "/",
      },
      {
        name: "novelPage",
        link: "/novelPage/*",
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        // [required] - path to your createStore module
        pathToCreateStoreModule: "./src/state/createStore",
        // [optional] - options passed to `serialize-javascript`
        // info: https://github.com/yahoo/serialize-javascript#options
        // will be merged with these defaults:
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {},
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
  ],
};
