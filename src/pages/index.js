import ArrowLink from '../components/ArrowLink';
import CollectionsRow from '../components/CollectionsRow';
import FeedItemTitle from '../components/FeedItemTitle';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import Resources from '../components/Resources';
import Seo from '../components/Seo';
import TweetEmbed from 'react-tweet-embed';
import striptags from 'striptags';
import {
  AspectRatio,
  Box,
  Flex,
  Grid,
  Heading,
  List,
  ListItem,
  Text
} from '@chakra-ui/core';
import {
  CONTAINER_PADDING_X,
  MAX_WIDTH,
  combinePosts,
  getNodeMeta,
  renderByline
} from '../utils';
import {decode} from 'he';
import {graphql} from 'gatsby';

// REDESIGN TODO:
// Change breakpoints to 1440, 1024, 768, 375, 320 (will need to refactor current media queries in this repo)

const TITLE = 'Apollo Developer Hub';
const DESCRIPTION =
  'Learn how to write your first GraphQL query or build a production graph with our curated resources.';
const TWEET_PATTERN = /^https?:\/\/twitter.com\/\w+\/status\/(\d+)/;
export default function HomePage({data, location}) {
  const [featuredPost, ...posts] = combinePosts(data).slice(0, 5);
  const featuredPostMeta = getNodeMeta(featuredPost);
  const featuredImage = featuredPost.featuredImage?.node.sourceUrl;
  const tweetMatches = featuredPostMeta.url.match(TWEET_PATTERN);
  return (
    <Layout pt="2">
      <Seo showTitle={false} title={TITLE} description={DESCRIPTION} />
      <Hero title={TITLE} description={DESCRIPTION} />

      <Box maxW={MAX_WIDTH} mx={{base: '8', md: '12', lg: '16', xl: 'auto'}}>
        <Resources />
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
              {featuredPost.internal.type === 'TwitchVideo' ? (
                <AspectRatio ratio={16 / 9}>
                  <iframe
                    key={location.hostname}
                    src={`https://player.twitch.tv/?video=${featuredPost.id}&parent=localhost&parent=apollo-devhub.netlify.app&parent=www.apollographql.com&autoplay=false`}
                    frameBorder="0"
                    scrolling="no"
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
              ) : tweetMatches ? (
                <TweetEmbed id={tweetMatches[1]} />
              ) : featuredImage ? (
                <Box w="full" as="img" src={featuredImage} />
              ) : null}
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
                        {decode(striptags(post.description))}
                      </Text>
                    )}
                    <Text color="gray.600" mt="2" fontSize="sm">
                      {renderByline(post)}
                    </Text>
                  </ListItem>
                );
              })}
            </List>
            <ArrowLink to="/feed" direction="right">
              Learn what&#39;s new
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
            Hand-picked lists of essential posts, videos, tutorials, and docs to
            help you learn GraphQL and Apollo.
          </Text>
          <ArrowLink direction="right" to="/collections">
            Explore all collections
          </ArrowLink>
        </Box>
      </Box>
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
    allWpCollection(
      filter: {collectionSettings: {isUnlisted: {ne: true}}}
      limit: 5
    ) {
      nodes {
        ...CollectionFragment
      }
    }
  }
`;
