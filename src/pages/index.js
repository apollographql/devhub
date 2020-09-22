import ArrowLink from '../components/ArrowLink';
import CollectionsRow from '../components/CollectionsRow';
import FeedItemTitle from '../components/FeedItemTitle';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import striptags from 'striptags';
import {
  AspectRatio,
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {combinePosts, getNodeMeta, renderByline} from '../utils';
import {graphql} from 'gatsby';

export default function HomePage({data, location}) {
  const [featuredPost, ...posts] = combinePosts(data).slice(0, 5);
  const featuredPostMeta = getNodeMeta(featuredPost);
  const featuredImage = featuredPost.featuredImage?.node.sourceUrl;
  return (
    <Layout>
      <Container maxW="xl" px={[8, 10, 12, 16]}>
        <Box maxW="container.sm" mb="24">
          <Heading
            mb="2"
            as="h1"
            fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}
          >
            Welcome to DevHub
          </Heading>
          <Text fontSize={{md: 'lg'}}>
            Apollo is a platform for building a data graph, a communication
            layer that seamlessly connects your application clients to your
            back-end services.
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: '2fr 1fr'
          }}
          gap={[8, 10, 12, 16]}
        >
          <Flex direction="column" justify="space-between">
            <div>
              <Heading mb="2" textStyle="subheading" fontSize="xs" as="h6">
                Featured{' '}
                <Box as="span" color="indigo.300">
                  {featuredPostMeta.type}
                </Box>
              </Heading>
              <FeedItemTitle
                url={featuredPostMeta.url}
                mb="4"
                as="h3"
                fontSize={{base: '2xl', md: '3xl'}}
              >
                {featuredPost.title}
              </FeedItemTitle>
              {featuredPost.internal.type === 'TwitchVideo' && (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    key={location.hostname}
                    src={`https://player.twitch.tv/?video=${featuredPost.id}&parent=localhost&parent=apollo-devhub.netlify.app&parent=apollographql.com&autoplay=false`}
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
          </Flex>
          <List spacing="6">
            {posts.map(post => {
              const {type, url} = getNodeMeta(post);
              return (
                <ListItem key={post.id}>
                  <Heading
                    textStyle="subheading"
                    fontSize="xs"
                    as="h6"
                    color="indigo.300"
                  >
                    {type}
                  </Heading>
                  <FeedItemTitle url={url}>{post.title}</FeedItemTitle>
                  {post.description && (
                    <Text
                      color="gray.600"
                      textStyle="clamped"
                      css={{WebkitLineClamp: 2}}
                    >
                      {striptags(post.description)}
                    </Text>
                  )}
                  <Text color="gray.600" mt="2" fontSize="sm">
                    {renderByline(post)}
                  </Text>
                </ListItem>
              );
            })}
          </List>
        </Grid>
        <Box mt="6">
          <ArrowLink to="/feed/1" direction="right">
            See the full feed
          </ArrowLink>
        </Box>
        <Divider mt="16" mb="20" />
        <Box maxW="container.md" mb="10">
          <Heading
            mb="4"
            fontSize={{
              base: '3xl',
              md: '4xl'
            }}
          >
            Apollo Collections
          </Heading>
          <Text fontSize={{md: 'lg'}}>
            The Apollo team along with our community members have been currating
            content into logical groups we call collections. They serve as the
            corpus of resources that can give any newcomer a head start, expand
            the knowledge of a novice, or take our advanced learners into
            expertise.
          </Text>
        </Box>
      </Container>
      <CollectionsRow mb="16" collections={data.allWpCollection.nodes} />
      <Container maxW="xl" px="16" mt="10">
        <ArrowLink direction="right" to="/collections">
          See all of our collections
        </ArrowLink>
      </Container>
    </Layout>
  );
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query HomePageQuery {
    allWpPost(limit: 5) {
      nodes {
        ...PostFragment
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
    allWpFeedItem(
      limit: 5
      filter: {feedItemSettings: {showInFeed: {eq: true}}}
    ) {
      nodes {
        ...FeedItemFragment
      }
    }
    allTwitchVideo(limit: 5) {
      nodes {
        ...VideoFragment
      }
    }
    allWpCollection(limit: 5) {
      nodes {
        ...CollectionFragment
      }
    }
  }
`;
