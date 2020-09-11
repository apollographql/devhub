import get from 'lodash/get';

export function renderByline(post, key = 'date') {
  const byline = [get(post, key)];

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
