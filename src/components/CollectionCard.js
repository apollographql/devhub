import ArrowLink from './ArrowLink';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Box, Heading, Text} from '@chakra-ui/core';
import {graphql} from 'gatsby';

export default function CollectionCard({collection, ...props}) {
  return (
    <div>
      <Box mb="2" {...props}>
        <Heading mb="1" as="h4" fontSize="2xl">
          {collection.title}
        </Heading>
        <Text fontSize="sm" textStyle="clamped" css={{WebkitLineClamp: 3}}>
          {striptags(collection.content)}
        </Text>
      </Box>
      <ArrowLink
        to={`/collection/${collection.slug}`}
        direction="right"
        fontSize="md"
        fontWeight="semibold"
      >
        +{collection.collectionSettings.items.length} more
      </ArrowLink>
    </div>
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
