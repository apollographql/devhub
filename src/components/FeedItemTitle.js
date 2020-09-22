import PropTypes from 'prop-types';
import React from 'react';
import {Heading, Link} from '@chakra-ui/core';

export default function FeedItemTitle({url, children, ...props}) {
  return (
    <Heading as="h4" fontSize={{base: 'xl', md: '2xl'}} {...props}>
      {url ? (
        <Link target="_blank" rel="noopener noreferrer" href={url}>
          {children}
        </Link>
      ) : (
        children
      )}
    </Heading>
  );
}

FeedItemTitle.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired
};
