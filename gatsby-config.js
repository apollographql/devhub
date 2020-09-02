module.exports = {
  plugins: [
    'gatsby-plugin-chakra-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Source Sans Pro',
            variants: ['400', '600', '700']
          },
          {
            family: 'Source Code Pro',
            variants: ['400', '700']
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-wordpress-experimental',
      options: {
        url:
          process.env.WORDPRESS_URL_DEV ||
          'https://wp.apollographql.com/graphql',
        html: {
          useGatsbyImage: false
        },
        type: {
          User: {
            excludeFieldNames: null
          },
          Post: {
            limit: process.env.NODE_ENV === 'production' ? undefined : 20
          }
        }
      }
    }
  ]
};
