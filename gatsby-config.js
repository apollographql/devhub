const {algoliaSettings} = require('apollo-algolia-transform');
const {transformer} = require('./algolia');
require('dotenv').config();

module.exports = {
  pathPrefix: '/developers',
  siteMetadata: {
    siteUrl: 'https://www.apollographql.com/developers'
  },
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
        // todo: remove ua id in the nearish future
        trackingIds: ['UA-74643563-17', 'G-0BGG5V2W2K', 'G-Y9B8QZGNQZ'],
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
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: ['ALGOLIA_APP_ID', 'ALGOLIA_SEARCH_KEY']
      }
    },
    {
      resolve: 'gatsby-plugin-algolia',
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_WRITE_KEY,
        // only index when building for production on Netlify
        skipIndexing:
          process.env.CONTEXT !== 'production' &&
          process.env.SKIP_INDEXING !== 'false',
        queries: [
          {
            query: `{
              site {
                siteMetadata {
                  siteUrl
                }
              }
              allWpCollection(filter: {collectionSettings: {isUnlisted: {ne: true}}}) {
                nodes {
                  id
                  slug
                  title
                  link
                  excerpt
                  content
                  date
                  categories {
                    nodes {
                      name
                    }
                  }
                  internal {
                    type
                  }
                  collectionSettings {
                    items {
                      ... on WpPost {
                        id
                        title
                        slug
                        excerpt
                        categories {
                          nodes {
                            name
                          }
                        }
                        date
                        internal {
                          type
                        }
                      }
                      ... on WpFeedItem {
                        id
                        title
                        slug
                        link
                        excerpt
                        internal {
                          type
                        }
                        feedItemTypes {
                          nodes {
                            name
                          }
                        }
                        feedItemSettings {
                          url
                        }
                        categories {
                          nodes {
                            name
                            
                          }
                        }
                        date
                      }
                    }
                  }
                  
                }
              }
            }               
            `,
            transformer,
            indexName: 'devhub',
            settings: {
              ...algoliaSettings
              // customRanking: ['desc(date)', ...algoliaSettings.customRanking]
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-K69NRN'
      }
    },
    'gatsby-plugin-sitemap'
  ]
};
