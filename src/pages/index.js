import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {
  Box,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {Link as GatsbyLink, graphql} from 'gatsby';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';
import {format} from 'date-fns';

export default function HomePage({data}) {
  const [featuredPost, ...posts] = data.allWpPost.nodes
    .concat(data.allTwitchVideo.nodes)
    .concat(data.allWpFeedItem.nodes)
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);
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
        <Flex direction="column" align="flex-start" justify="space-between">
          <div>
            <Heading mb="2" textStyle="subheading" fontSize="xs" as="h6">
              Featured{' '}
              <Box as="span" color="indigo.300">
                {featuredPost.internal.niceType}
              </Box>
            </Heading>
            <Heading as="h3" fontSize="3xl">
              {featuredPost.title}
            </Heading>
            {featuredPost.description && (
              <Text>{striptags(featuredPost.description)}</Text>
            )}
            <Text fontSize="sm">{format(Number(featuredPost.date), 'PP')}</Text>
          </div>
          <Link
            as={GatsbyLink}
            to="/feed"
            color="indigo.800"
            fontWeight="bold"
            fontSize="xl"
          >
            <Flex align="center">
              See the full feed
              <Box ml="2" as={IconProceed} h="4" />
            </Flex>
          </Link>
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
              {post.description && <Text>{striptags(post.description)}</Text>}
              <Text mt="2" fontSize="sm">
                {format(Number(post.date), 'PP')}
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
        date(formatString: "x")
        featuredImage {
          node {
            sourceUrl
          }
        }
        internal {
          niceType
        }
      }
    }
    allTwitchVideo(limit: 5) {
      nodes {
        id
        title
        description
        date: published_at(formatString: "x")
        preview {
          medium
        }
        internal {
          niceType
        }
      }
    }
    allWpFeedItem(limit: 5) {
      nodes {
        id
        title
        description: content
        date(formatString: "x")
        internal {
          niceType
        }
      }
    }
  }
`;
