exports.renderByline = (post, defaultLine) => {
  const byline = [defaultLine || post.date];

  if (post.internal.type === 'WpPost') {
    byline.push(
      post.author.node.name,
      post.categories.nodes.map(node => node.name).join(', ')
    );
  }

  switch (post.internal.type) {
    case 'WpPost':
      byline.push(
        post.author.node.name,
        post.categories.nodes.map(node => node.name).join(', ')
      );
      break;
    case 'WpFeedItem': {
      const {author} = post.feedItemSettings;
      if (author) {
        byline.push(author);
      }
      break;
    }
    default:
  }

  return byline.join(' · ');
};

exports.combinePosts = data => {
  return data.allWpPost.nodes
    .concat(data.allWpFeedItem.nodes)
    .concat(data.allTwitchVideo.nodes)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
};

exports.getNodeMeta = node => {
  switch (node.internal.type) {
    case 'WpPost':
      return {
        type: 'Blog post',
        url: `https://www.apollographql.com/blog/${node.slug}`
      };
    case 'TwitchVideo':
      return {
        type: node.broadcast_type === 'highlight' ? 'Highlight' : 'Stream',
        url: node.url
      };
    case 'WpFeedItem': {
      const [feedItemType] = node.feedItemTypes.nodes;
      return {
        type: feedItemType ? feedItemType.name : 'Feed item',
        url: node.feedItemSettings.url
      };
    }
    default:
      return {type: node.internal.type};
  }
};

exports.CONTAINER_PADDING_X = [8, 10, 12, 16];
