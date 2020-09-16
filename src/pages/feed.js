import ArrowLink from '../components/ArrowLink';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {combinePosts, getNiceType, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function Feed({data}) {
  const posts = combinePosts(data);
  return (
    <Layout>
      <Container maxW="xl" px="16">
        <ArrowLink ml="-22px" mb="4" to="/">
          DevHub
        </ArrowLink>
        <Box maxW="container.sm" mb="24">
          <Heading mb="4" fontSize="3xl">
            News Feed
          </Heading>
          <Text fontSize="lg">
            This copy should be descriptive of why this collection exists.
            Including what is in the collection – types of content that
            dominate, maybe this one is blog post heavy but has a single
            implementation item making it more of an overview type of
            collection. If we know what the collection includes we can present
            it as tailored to a skill.
          </Text>
        </Box>
      </Container>
      <Container maxW="lg" px="16">
        <List spacing="4">
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
                    {renderByline(post, getNiceType)}
                  </Text>
                </div>
              </Flex>
            </ListItem>
          ))}
        </List>
      </Container>
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
        categories {
          nodes {
            name
          }
        }
        internal {
          type
        }
      }
    }
    allWpFeedItem(filter: {feedItemSettings: {showInFeed: {eq: true}}}) {
      nodes {
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
    }
    allTwitchVideo(filter: {published_at: {gt: "0"}}) {
      nodes {
        id
        title
        description
        broadcast_type
        date: published_at(formatString: "ll")
        internal {
          type
        }
      }
    }
  }
`;
