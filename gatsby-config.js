require('dotenv').config();

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
            variants: ['400', '600']
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
          Post: {
            limit: process.env.NODE_ENV === 'production' ? undefined : 20
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'twitch',
        name: 'Video',
        method: 'GET',
        url: 'https://api.twitch.tv/kraken/channels/497275841/videos',
        entityLevel: 'videos',
        headers: {
          Accept: 'application/vnd.twitchtv.v5+json',
          'Client-ID': process.env.TWITCH_CLIENT_ID
        },
        params: {
          limit: 100
        }
      }
    }
  ]
};
