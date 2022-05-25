exports.renderByline = (post, byline = [post.date]) => {
  const {type} = post.internal;
  const isFeedItem = type === 'WpFeedItem';
  if (isFeedItem || type === 'WpPost') {
    let categories = post.categories.nodes.map(node => node.name);
    if (isFeedItem) {
      categories = categories.filter(category => category !== 'Community');
      const {author} = post.feedItemSettings;
      if (author) {
        byline.push(author);
      }
    } else {
      byline.push(post.author.node.name);
    }

    if (categories.length) {
      byline.push(categories.join(', '));
    }
  }
  return byline.join(' · ');
};

exports.getNodeMeta = node => {
  switch (node.internal.type) {
    case 'WpPost':
      return {
        type: 'Blog post',
        url: `https://www.apollographql.com/blog/${node.slug}`
      };
    case 'WpFeedItem': {
      const [feedItemType] = node.feedItemTypes.nodes;
      return {
        type: feedItemType ? feedItemType.name : 'Feed item',
        url: node.feedItemSettings.url
      };
    }
    case 'CommunityPost': {
      return {
        type: 'Community',
        url: `https://community.apollographql.com/t/${node.topic_slug}`
      };
    }
    case 'WpEvent': {
      return {
        type: 'Event',
        url: `https://www.apollographql.com/events/${node.eventsMetadata.eventType[0].slug}/register/${node.slug}`
      };
    }
    case 'OdysseyCourse': {
      return {
        type: 'Odyssey Course',
        url: node.url
      };
    }
    default:
      return {type: node.internal.type};
  }
};

exports.CONTAINER_PADDING_X = [8, 10, 12, 16];
const MAX_WIDTH = '1152px';

exports.MAX_WIDTH = MAX_WIDTH;
exports.SECTION_SPACING = {base: 8, md: 12, lg: 16, xl: 'auto'};

exports.UNDERLINE_ANIMATION = {
  display: 'inline',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 2px, 0 2px',
  backgroundPosition: '100% 100%, 0 100%',
  transition: 'background-size .2s linear',
  css({theme}) {
    return {
      backgroundImage: `linear-gradient(transparent, transparent), linear-gradient(${theme.colors.indigo[600]}, ${theme.colors.indigo[600]})`
    };
  }
};

exports.UNDERLINE_HOVER = {
  backgroundSize: '0 2px, 100% 2px'
};
