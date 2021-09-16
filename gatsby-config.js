require('dotenv').config();

module.exports = {
  pathPrefix: '/developers',
  plugins: [
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        // TODO: re-enable color modes
        isUsingColorMode: false
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-webfonts',
      options: {
        fonts: {
          google: [
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
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
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
            limit: 1
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
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'Community',
        name: 'Post',
        method: 'GET',
        url: 'https://community.apollographql.com/posts.json',
        entityLevel: 'latest_posts'
      }
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        typePrefix: 'Odyssey',
        name: 'Course',
        method: 'GET',
        url: 'https://odyssey.apollographql.com/courses-api/courses.json',
        entityLevel: 'odyssey-courses'
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ['UA-74643563-17', 'G-0BGG5V2W2K'],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          respectDNT: true
        }
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
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-K69NRN'
      }
    }
  ]
};
