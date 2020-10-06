import FeedItemTitle from './FeedItemTitle';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Badge, Box, Container, Heading, Text} from '@chakra-ui/core';
import {getNodeMeta, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function FeedTable({
  posts,
  children,
  swapDate,
  showDescription,
  ...props
}) {
  return (
    <Container maxW="lg" px="0" {...props}>
      <Box as="table" maxW="container.md">
        <tbody>
          {posts.map((post, index) => {
            const {type, url} = getNodeMeta(post);
            const isDescriptionShown =
              (showDescription || !index) && post.description;
            const isBylineShown =
              post.internal.type !== 'WpFeedItem' ||
              post.feedItemSettings.isPaid ||
              post.feedItemTypes.nodes.every(
                // if the item is not a docs article
                ({databaseId}) => databaseId !== 87
              );
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
                    textAlign="right"
                  >
                    {swapDate ? post.date : type}
                  </Heading>
                </td>
                <td>
                  <FeedItemTitle url={url}>{post.title}</FeedItemTitle>
                  {isDescriptionShown && (
                    <Text
                      mt="2"
                      fontSize={{md: 'lg'}}
                      color="gray.600"
                      textStyle="clamped"
                      css={{WebkitLineClamp: 2}}
                    >
                      {striptags(post.description)}
                    </Text>
                  )}
                  {isBylineShown && (
                    <Text
                      mt={isDescriptionShown ? 4 : 2}
                      lineHeight="normal"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {post.feedItemSettings?.isPaid && (
                        <>
                          <Badge verticalAlign="initial" colorScheme="green">
                            Paid
                          </Badge>{' '}
                        </>
                      )}
                      {renderByline(post, swapDate && type)}
                    </Text>
                  )}
                </td>
              </Box>
            );
          })}
          {children}
        </tbody>
      </Box>
    </Container>
  );
}

FeedTable.propTypes = {
  children: PropTypes.node,
  swapDate: PropTypes.bool,
  showDescription: PropTypes.bool,
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
      author
      isPaid
    }
    feedItemTypes {
      nodes {
        name
        databaseId
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
