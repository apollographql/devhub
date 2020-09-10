import ArrowLink from '../components/ArrowLink';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Box, Flex, Heading, List, ListItem, Text} from '@chakra-ui/core';
import {combinePosts, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function Feed({data}) {
  const posts = combinePosts(data);
  return (
    <Layout>
      <ArrowLink ml="-22px" mb="4" to="/">
        DevHub
      </ArrowLink>
      <Box maxW="container.sm" mb="24">
        <Heading mb="4" fontSize="3xl">
          News Feed
        </Heading>
        <Text fontSize="lg">
          This copy should be descriptive of why this collection exists.
          Including what is in the collection – types of content that dominate,
          maybe this one is blog post heavy but has a single implementation item
          making it more of an overview type of collection. If we know what the
          collection includes we can present it as tailored to a skill.
        </Text>
      </Box>
      <List pl="16" spacing="4">
        {posts.map((post, index) => (
          <ListItem key={post.id}>
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
                {!index && post.description && (
                  <Text mb="4" fontSize="lg" color="gray.600">
                    {striptags(post.description)}
                  </Text>
                )}
                <Text color="gray.600" fontSize="sm">
                  {renderByline(post, 'internal.niceType')}
                </Text>
              </div>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Layout>
  );
}

Feed.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query FeedQuery {
    allWpPost {
      nodes {
        id
        title
        description: excerpt
        date(formatString: "ll")
        author {
          node {
            name
          }
        }
        internal {
          niceType
        }
      }
    }
    allWpFeedItem {
      nodes {
        id
        title
        description: content
        date(formatString: "ll")
        internal {
          niceType
        }
      }
    }
    allTwitchVideo(filter: {published_at: {gt: "0"}}) {
      nodes {
        id
        title
        description
        broadcast_type
        date: published_at(formatString: "ll")
        internal {
          niceType
        }
      }
    }
  }
`;
