import Collections from '../components/collections';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import NewContent from '../components/NewContent';
import PropTypes from 'prop-types';
import React from 'react';
import Resources from '../components/Resources';
import Seo from '../components/Seo';
import {Box} from '@chakra-ui/core';
import {SECTION_SPACING, combinePosts, getNodeMeta} from '../utils';
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

      <Box {...SECTION_SPACING}>
        <Resources />
      </Box>

      <Collections collections={data.allWpCollection.nodes} />

      <Box {...SECTION_SPACING}>
        <NewContent
          featuredPost={featuredPost}
          featuredPostMeta={featuredPostMeta}
          tweetMatches={tweetMatches}
          featuredImage={featuredImage}
          location={location}
          posts={posts}
        />
      </Box>
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
        author {
          node {
            name
          }
        }
        ...CollectionFragment
      }
    }
  }
`;
