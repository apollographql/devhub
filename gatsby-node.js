exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    Internal: {
      niceType: {
        type: 'String',
        resolve(source) {
          switch (source.type) {
            case 'WpPost':
              return 'blog post';
            case 'twitchVideo':
              return 'stream';
            case 'WpFeedItem':
              return 'announcement';
            default:
              return source.type;
          }
        }
      }
    }
  });
};
