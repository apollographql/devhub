import ArrowLink from './ArrowLink';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Box, Heading, Text} from '@chakra-ui/core';
import {graphql} from 'gatsby';

export default function CollectionCard({collection, ...props}) {
  return (
    <Box {...props}>
      <Heading
        w="full"
        mb="1"
        as="h4"
        isTruncated
        fontSize={{
          base: 'xl',
          md: '2xl'
        }}
      >
        {collection.title}
      </Heading>
      <Text mb="2" fontSize="sm" textStyle="clamped" css={{WebkitLineClamp: 3}}>
        {striptags(collection.content)}
      </Text>
      <ArrowLink
        mt="auto"
        to={`/collection/${collection.slug}`}
        direction="right"
        fontSize="md"
        fontWeight="semibold"
      >
        +{collection.collectionSettings.items.length} more
      </ArrowLink>
    </Box>
  );
}

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  fragment CollectionFragment on WpCollection {
    id
    slug
    title
    content
    categories {
      nodes {
        id
        name
      }
    }
    collectionSettings {
      items {
        ... on WpPost {
          ...PostFragment
        }
        ... on WpFeedItem {
          ...FeedItemFragment
        }
      }
    }
  }
`;
