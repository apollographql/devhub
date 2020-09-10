export function renderByline(post) {
  return (post.author ? `${post.author.node.name} · ` : '') + post.date;
}

export function combinePosts(data) {
  return data.allWpPost.nodes
    .concat(data.allWpFeedItem.nodes)
    .concat(data.allTwitchVideo.nodes)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
