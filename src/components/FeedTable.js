import FeedItemTitle from './FeedItemTitle';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Box, Container, Heading, Text} from '@chakra-ui/core';
import {getNodeMeta, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function FeedTable({posts, swapDate, ...props}) {
  return (
    <Container maxW="lg" px="0" {...props}>
      <Box as="table" maxW="container.md">
        <tbody>
          {posts.map((post, index) => {
            const {type, url} = getNodeMeta(post);
            return (
              <Box
                key={post.id}
                as="tr"
                sx={{
                  td: {
                    verticalAlign: 'top'
                  },
                  ':not(:last-child) td': {
                    pb: 8
                  }
                }}
              >
                <td>
                  <Heading
                    mr="8"
                    as="h6"
                    textStyle="subheading"
                    fontSize="xs"
                    lineHeight="30px"
                    whiteSpace="nowrap"
                  >
                    {swapDate ? post.date : type}
                  </Heading>
                </td>
                <td>
                  <FeedItemTitle mb="2" url={url}>
                    {post.title}
                  </FeedItemTitle>
                  {!index && post.description && (
                    <Text mb="4" fontSize={{md: 'lg'}} color="gray.600">
                      {striptags(post.description)}
                    </Text>
                  )}
                  <Text color="gray.600" fontSize="sm">
                    {renderByline(post, swapDate && type)}
                  </Text>
                </td>
              </Box>
            );
          })}
        </tbody>
      </Box>
    </Container>
  );
}

FeedTable.propTypes = {
  swapDate: PropTypes.bool,
  posts: PropTypes.array.isRequired
};

export const pageQuery = graphql`
  fragment PostFragment on WpPost {
    id
    title
    slug
    description: excerpt
    date(formatString: "ll")
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
    date(formatString: "ll")
    internal {
      type
    }
    feedItemSettings {
      url
    }
    feedItemTypes {
      nodes {
        name
      }
    }
  }

  fragment VideoFragment on TwitchVideo {
    id: _id
    title
    description
    broadcast_type
    url
    date: published_at(formatString: "ll")
    internal {
      type
    }
  }
`;