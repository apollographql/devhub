import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Box, Container, Heading, Text} from '@chakra-ui/core';
import {getNiceType, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function FeedTable({posts, swapDate}) {
  return (
    <Container maxW="lg" px="16">
      <table>
        <tbody>
          {posts.map((post, index) => {
            const niceType = getNiceType(post);
            return (
              <Box
                key={post.id}
                as="tr"
                sx={{
                  td: {
                    verticalAlign: 'top'
                  },
                  ':not(:last-child) td': {
                    pb: 4
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
                    {swapDate ? post.date : niceType}
                  </Heading>
                </td>
                <td>
                  <Heading mb="2" as="h3" fontSize="2xl">
                    {post.title}
                  </Heading>
                  {!index && post.description && (
                    <Text mb="4" fontSize="lg" color="gray.600">
                      {striptags(post.description)}
                    </Text>
                  )}
                  <Text color="gray.600" fontSize="sm">
                    {renderByline(post, swapDate && niceType)}
                  </Text>
                </td>
              </Box>
            );
          })}
        </tbody>
      </table>
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
    feedItemTypes {
      nodes {
        name
      }
    }
  }
`;
