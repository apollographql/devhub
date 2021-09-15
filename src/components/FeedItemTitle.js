import PropTypes from 'prop-types';
import React from 'react';
import {Box, Heading, Link} from '@chakra-ui/core';

export default function FeedItemTitle({
  url,
  children,
  underlineAnimation,
  ...props
}) {
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
            {...underlineAnimation.base}
            _hover={underlineAnimation.hover}
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
      // {...underlineAnimation.base}
      // _hover={underlineAnimation.hover}
      {...props}
    >
      {children}
    </Heading>
  );
}

FeedItemTitle.propTypes = {
  url: PropTypes.string,
  children: PropTypes.node.isRequired,
  underlineAnimation: PropTypes.object
};
