exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    Internal: {
      niceType: {
        type: 'String',
        resolve(source) {
          switch (source.type) {
            case 'WpPost':
              return 'Blog post';
            case 'twitchVideo':
              return 'Stream';
            case 'WpFeedItem':
              return 'Feed item';
            default:
              return source.type;
          }
        }
      }
    }
  });
};
