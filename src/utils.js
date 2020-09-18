export function renderByline(post, defaultLine) {
  const byline = [defaultLine || post.date];

  if (post.internal.type === 'WpPost') {
    byline.unshift(post.author.node.name);
    byline.push(post.categories.nodes.map(node => node.name).join(', '));
  }

  return byline.join(' · ');
}

export function combinePosts(data) {
  return data.allWpPost.nodes
    .concat(data.allWpFeedItem.nodes)
    .concat(data.allTwitchVideo.nodes)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getNodeMeta(node) {
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
}
