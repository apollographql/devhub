import get from 'lodash/get';

export function renderByline(post, key = 'date') {
  return (post.author ? `${post.author.node.name} · ` : '') + get(post, key);
}

export function combinePosts(data) {
  return data.allWpPost.nodes
    .concat(data.allWpFeedItem.nodes)
    .concat(data.allTwitchVideo.nodes)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
