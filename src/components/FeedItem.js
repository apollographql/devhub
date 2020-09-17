import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Flex, Heading, Text} from '@chakra-ui/core';
import {getNiceType, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function FeedItem({post}) {
  return (
    <Flex align="flex-start">
      <Heading
        mr="8"
        w="12ch"
        as="h6"
        textStyle="subheading"
        fontSize="xs"
        lineHeight="30px"
      >
        {post.date}
      </Heading>
      <div>
        <Heading mb="2" as="h3" fontSize="2xl">
          {post.title}
        </Heading>
        {post.description && (
          <Text mb="4" fontSize="lg" color="gray.600">
            {striptags(post.description)}
          </Text>
        )}
        <Text color="gray.600" fontSize="sm">
          {renderByline(post, getNiceType)}
        </Text>
      </div>
    </Flex>
  );
}

FeedItem.propTypes = {
  post: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  fragment PostFragment on WpPost {
    id
    title
    description: excerpt
    date(formatString: "LL")
    author {
      node {
        name
      }
    }
    categories {
      nodes {
        name
      }
    }
    internal {
      type
    }
  }

  fragment FeedItemFragment on WpFeedItem {
    id
    title
    description: excerpt
    date(formatString: "LL")
    internal {
      type
    }
    feedItemTypes {
      nodes {
        name
      }
    }
  }
`;
