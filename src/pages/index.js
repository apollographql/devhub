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
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {
  CONTAINER_PADDING_X,
  combinePosts,
  getNodeMeta,
  renderByline
} from '../utils';
import {graphql} from 'gatsby';

export default function HomePage({data, location}) {
  const [featuredPost, ...posts] = combinePosts(data).slice(0, 5);
  const featuredPostMeta = getNodeMeta(featuredPost);
  const featuredImage = featuredPost.featuredImage?.node.sourceUrl;
  return (
    <Layout>
      <Container maxW="xl" px={CONTAINER_PADDING_X}>
        <Box maxW="container.sm" mb="12">
          <Heading mb="2" as="h1" fontSize={{base: '4xl', md: '5xl'}}>
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
          gap={CONTAINER_PADDING_X}
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
          <div>
            <List mb="6" spacing="6">
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
            <ArrowLink to="/feed/1" direction="right">
              See the full feed
            </ArrowLink>
          </div>
        </Grid>
        <Box id="collections" pt="20" maxW="container.md">
          <Heading
            mb="4"
            fontSize={{
              base: '3xl',
              md: '4xl'
            }}
          >
            <a href="#collections">Apollo Collections</a>
          </Heading>
          <Text mb="6" fontSize={{md: 'lg'}}>
            The Apollo team has been currating content into logical groups we
            call collections. They serve as the corpus of resources that can
            give any newcomer a head start, expand the knowledge of a novice, or
            take our advanced learners into expertise.
          </Text>
          <ArrowLink direction="right" to="/collections">
            See all of our collections
          </ArrowLink>
        </Box>
      </Container>
      <CollectionsRow collections={data.allWpCollection.nodes} />
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
