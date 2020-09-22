const {combinePosts} = require('./src/utils');

const FEED_PAGE_SIZE = 10;

exports.createPages = async ({graphql, actions}) => {
  const {data} = await graphql(`
    {
      allWpCollection {
        nodes {
          id
          slug
          categories {
            nodes {
              id
            }
          }
        }
      }
      allWpPost {
        nodes {
          id
          date
          internal {
            type
          }
        }
      }
      allWpFeedItem(filter: {feedItemSettings: {showInFeed: {eq: true}}}) {
        nodes {
          id
          date
          internal {
            type
          }
        }
      }
      allTwitchVideo(filter: {published_at: {gt: "0"}}) {
        nodes {
          id: _id
          date: published_at
          internal {
            type
          }
        }
      }
    }
  `);

  data.allWpCollection.nodes.forEach(collection =>
    actions.createPage({
      component: require.resolve('./src/templates/collection'),
      path: '/collection/' + collection.slug,
      context: {
        id: collection.id,
        categoryIds: collection.categories.nodes.map(category => category.id)
      }
    })
  );

  const allPosts = combinePosts(data);
  const totalPages = Math.ceil(allPosts.length / FEED_PAGE_SIZE);
  for (let i = 0; i < totalPages; i++) {
    const start = i * FEED_PAGE_SIZE;
    const posts = allPosts.slice(start, start + FEED_PAGE_SIZE);
    const ids = posts.reduce(
      (acc, post) => {
        const key = 'id' + post.internal.type;
        return {
          ...acc,
          [key]: [...acc[key], post.id]
        };
      },
      {
        idWpPost: [],
        idWpFeedItem: [],
        idTwitchVideo: []
      }
    );

    const currentPage = i + 1;
    actions.createPage({
      component: require.resolve('./src/templates/feed'),
      path: '/feed/' + currentPage,
      context: {
        currentPage,
        totalPages,
        ...ids
      }
    });
  }
};
