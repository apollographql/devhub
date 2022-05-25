import FeedItemTitle from './FeedItemTitle';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Badge, Box, Container, Flex, Heading, Text} from '@chakra-ui/core';
import {IconPlanet1} from '@apollo/space-kit/icons/IconPlanet1';
import {decode} from 'he';
import {getNodeMeta, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function FeedTable({posts, children, showDate, ...props}) {
  return (
    <Container maxW="lg" px="0" {...props}>
      <Box as="table" maxW="container.md">
        <tbody>
          {posts.map(post => {
            const {type, url} = getNodeMeta(post);
            const isPaid = post.feedItemSettings?.isPaid;
            const byline = renderByline(post, showDate ? [type] : []);
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
                    {showDate ? post.date : type}
                  </Heading>
                </td>
                <td>
                  {post.internal.type === 'WpFeedItem' &&
                    post.categories.nodes.some(
                      category => category.name === 'Community'
                    ) && (
                      <Flex
                        align="center"
                        color="gray.400"
                        fontWeight="semibold"
                        mb="1"
                      >
                        <Box as={IconPlanet1} mr="1" h="1em" /> From the
                        community
                      </Flex>
                    )}
                  <FeedItemTitle url={url}>{post.title}</FeedItemTitle>
                  {post.description && (
                    <Text
                      mt="2"
                      fontSize={{md: 'lg'}}
                      color="gray.600"
                      textStyle="clamped"
                      css={{WebkitLineClamp: 2}}
                    >
                      {decode(striptags(post.description))}
                    </Text>
                  )}
                  {(byline || isPaid) && (
                    <Text
                      mt={post.description ? 4 : 2}
                      lineHeight="normal"
                      color="gray.600"
                      fontSize="sm"
                    >
                      {isPaid && (
                        <>
                          <Badge verticalAlign="initial">Paid access</Badge>{' '}
                        </>
                      )}
                      {byline}
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
  showDate: PropTypes.bool,
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
    categories {
      nodes {
        name
      }
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
`;
