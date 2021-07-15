import PropTypes from 'prop-types';
import React from 'react';
import he from 'he';
import striptags from 'striptags';
import {Flex, Heading, Text} from '@chakra-ui/core';
import {graphql} from 'gatsby';

export default function CollectionCard({collection, children, ...props}) {
  return (
    <Flex
      align="flex-start"
      direction="column"
      p="4"
      borderRadius="lg"
      {...props}
    >
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
        {he(striptags(collection.content))}
      </Text>
      {children}
    </Flex>
  );
}

CollectionCard.propTypes = {
  children: PropTypes.node.isRequired,
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
