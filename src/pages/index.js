import ArrowLink from '../components/ArrowLink';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {
  AspectRatio,
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {combinePosts, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function HomePage({data}) {
  const [featuredPost, ...posts] = combinePosts(data).slice(0, 5);
  const featuredImage = featuredPost.featuredImage?.node.sourceUrl;
  return (
    <Layout>
      <Box maxW="container.sm" mb="24">
        <Heading mb="1" as="h1" fontSize="6xl">
          Welcome to DevHub
        </Heading>
        <Text fontSize="lg">
          Apollo is a platform for building a data graph, a communication layer
          that seamlessly connects your application clients to your back-end
          services.
        </Text>
      </Box>
      <Grid templateColumns="2fr 1fr" gap="16">
        <Flex direction="column" justify="space-between">
          <div>
            <Heading mb="2" textStyle="subheading" fontSize="xs" as="h6">
              Featured{' '}
              <Box as="span" color="indigo.300">
                {featuredPost.internal.niceType}
              </Box>
            </Heading>
            <Heading mb="4" as="h3" fontSize="3xl">
              {featuredPost.title}
            </Heading>
            {featuredPost.internal.type === 'twitchVideo' && (
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={`https://player.twitch.tv/?video=${featuredPost.id}&parent=localhost&autoplay=false`}
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            )}
            {featuredImage && <Box w="full" as="img" src={featuredImage} />}
            <Text color="gray.600" mt="6" fontSize="sm">
              {renderByline(featuredPost)}
            </Text>
          </div>
          <Box mt="6">
            <ArrowLink to="/feed" direction="right">
              See the full feed
            </ArrowLink>
          </Box>
        </Flex>
        <List spacing="6">
          {posts.map(post => (
            <ListItem key={post.id}>
              <Heading
                textStyle="subheading"
                fontSize="xs"
                as="h6"
                color="indigo.300"
              >
                {post.internal.niceType}
              </Heading>
              <Heading as="h3" fontSize="2xl">
                {post.title}
              </Heading>
              {post.description && (
                <Text
                  color="gray.600"
                  display="-webkit-box"
                  overflow="hidden"
                  css={{
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {striptags(post.description)}
                </Text>
              )}
              <Text color="gray.600" mt="2" fontSize="sm">
                {renderByline(post)}
              </Text>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Divider mt="16" mb="20" />
      <Box maxW="container.md">
        <Heading mb="4" fontSize="3xl">
          Apollo Collections
        </Heading>
        <Text fontSize="lg">
          The Apollo team along with our community members have been currating
          content into logical groups we call collections. They serve as the
          corpus of resources that can give any newcomer a head start, expand
          the knowledge of a novice, or take our advanced learners into
          expertise.
        </Text>
      </Box>
    </Layout>
  );
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query HomePageQuery {
    allWpPost(limit: 5) {
      nodes {
        id
        title
        description: excerpt
        date(formatString: "LL")
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        categories {
          nodes {
            name
          }
        }
        internal {
          type
          niceType
        }
      }
    }
    allWpFeedItem(limit: 5) {
      nodes {
        id
        title
        description: content
        date(formatString: "LL")
        internal {
          niceType
        }
      }
    }
    allTwitchVideo(limit: 5) {
      nodes {
        id: _id
        title
        description
        broadcast_type
        date: published_at(formatString: "LL")
        internal {
          type
          niceType
        }
      }
    }
  }
`;
