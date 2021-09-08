import CollectionsRow from './CollectionsRow';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, Heading, Text} from '@chakra-ui/core';
import {SECTION_SPACING} from '../../utils';

export default function Collections({collections}) {
  return (
    <Box w="full" bg="gray.50" py={{base: '8', lg: '40px'}}>
      <Box as="section" id="collections" {...SECTION_SPACING}>
        <Heading as="h2" fontSize="1.5rem" mb="2">
          <a href="#collections">Apollo Collections</a>
        </Heading>
        <Text mb="6" fontSize={{md: 'lg'}} w={{base: 'full', lg: '50%'}}>
          Looking for resources on federation, caching, or other special topics?
          We&apos;ve grouped our favorite posts, videos, tutorials, and docs
          into collections to help you solve common GraphQL challenges.
        </Text>
      </Box>
      <CollectionsRow collections={collections} />
    </Box>
  );
}

Collections.propTypes = {
  collections: PropTypes.array.isRequired
};
