import PropTypes from 'prop-types';
import React from 'react';
import {Box, Heading, Link} from '@chakra-ui/core';
import {UNDERLINE_ANIMATION, UNDERLINE_HOVER} from '../utils';

export default function FeedItemTitle({url, children, ...props}) {
  if (url) {
    return (
      <Heading as="h4" fontSize={{base: 'xl', md: '2xl'}} {...props}>
        {/* Link wrapper w/ a width needed for underline hover animation */}
        <Box w="full">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={url}
            textDecoration="none"
            cursor="pointer"
            {...UNDERLINE_ANIMATION}
            _hover={UNDERLINE_HOVER}
            _focus={UNDERLINE_HOVER}
          >
            {children}
          </Link>
        </Box>
      </Heading>
    );
  }

  // if it's not a link, probably don't want a hover underline animation
  return (
    <Heading
      as="h4"
      fontSize={{base: 'xl', md: '2xl'}}
      // {...UNDERLINE_ANIMATION}
      // _hover={UNDERLINE_HOVER}
      {...props}
    >
      {children}
    </Heading>
  );
}

FeedItemTitle.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired
};
