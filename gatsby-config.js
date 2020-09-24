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
          CareersSlider2: {
            exclude: true
          },
          CareersHeroSlider: {
            exclude: true
          },
          CareersSlider3: {
            exclude: true
          },
          Cta: {
            exclude: true
          },
          MenuItem: {
            exclude: true
          },
          TeamMember: {
            exclude: true
          },
          Post: {
            // limit: process.env.NODE_ENV === 'production' ? undefined : 20
          }
        }
      }
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'Twitch',
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
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-74643563-17'
      }
    },
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        fields: ['title', 'content', 'excerpt'],
        resolvers: {
          WpCollection: {
            slug: node => node.slug,
            title: node => node.title,
            content: node => node.content,
            excerpt: node => node.excerpt
          }
        }
      }
    }
  ]
};
