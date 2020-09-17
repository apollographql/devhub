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

export function getNiceType(node) {
  switch (node.internal.type) {
    case 'WpPost':
      return 'Blog post';
    case 'twitchVideo':
      return node.broadcast_type === 'highlight' ? 'Highlight' : 'Stream';
    case 'WpFeedItem': {
      const [feedItemType] = node.feedItemTypes?.nodes;
      return feedItemType ? feedItemType.name : 'Feed item';
    }
    default:
      return node.internal.type;
  }
}
