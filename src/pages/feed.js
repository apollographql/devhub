import ArrowLink from '../components/ArrowLink';
import FeedItem from '../components/FeedItem';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import {Box, Container, Heading, List, ListItem, Text} from '@chakra-ui/core';
import {combinePosts} from '../utils';
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
          {posts.map(post => (
            <ListItem key={post.id}>
              <FeedItem post={post} />
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
        ...PostFragment
      }
    }
    allWpFeedItem(filter: {feedItemSettings: {showInFeed: {eq: true}}}) {
      nodes {
        ...FeedItemFragment
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
