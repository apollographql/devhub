import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {Box, Button, Heading, List, ListItem, Text} from '@chakra-ui/core';
import {Link as GatsbyLink, graphql} from 'gatsby';
import {IconBack} from '@apollo/space-kit/icons/IconBack';
import {combinePosts, renderByline} from '../utils';

export default function Feed({data}) {
  const posts = combinePosts(data);
  return (
    <Layout>
      <Button
        ml="-22px"
        mb="4"
        fontSize="xl"
        colorScheme="indigo"
        variant="link"
        as={GatsbyLink}
        to="/"
        leftIcon={<Box as={IconBack} h="1em" fontSize="sm" />}
      >
        DevHub
      </Button>
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
            <Heading as="h3" fontSize="2xl">
              {post.title}
            </Heading>
            {!index && post.description && (
              <Text color="gray.600">{striptags(post.description)}</Text>
            )}
            <Text color="gray.600" mt="2" fontSize="sm">
              {post.internal.niceType} · {renderByline(post)}
            </Text>
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
        date(formatString: "LL")
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
    allTwitchVideo {
      nodes {
        id
        title
        description
        date: published_at(formatString: "LL")
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
        date(formatString: "LL")
        internal {
          niceType
        }
      }
    }
  }
`;
