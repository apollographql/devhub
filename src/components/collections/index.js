import CollectionsGrid from './CollectionsGrid';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, Heading, Text} from '@chakra-ui/core';
import {MAX_WIDTH, SECTION_SPACING} from '../../utils';
export default function Collections({collections}) {
  return (
    <Box
      w="full"
      bg="gray.50"
      // pt={{base: '8', lg: '10'}}
      // pb={{base: '10', lg: '12'}}
      // mb={{base: '8', lg: '10', '2xl': '8'}}
      py="6"
      mb="6"
    >
      <Box as="section" id="collections" mx={SECTION_SPACING}>
        <Box w="full" maxW={MAX_WIDTH} mx="auto">
          <Heading as="h2" fontSize="2xl" mb="1">
            <a href="#collections">Apollo Collections</a>
          </Heading>
          <Text mb="6" w={{base: 'full', lg: '50%'}}>
            Looking for resources on federation, caching, or other special
            topics? We&apos;ve grouped our favorite posts, videos, tutorials,
            and docs into collections to help you solve common GraphQL
            challenges.
          </Text>
          <CollectionsGrid collections={collections} />
        </Box>
      </Box>
    </Box>
  );
}

Collections.propTypes = {
  collections: PropTypes.array.isRequired
};
