import Collections from '../components/collections';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import NewContent from '../components/NewContent';
import PropTypes from 'prop-types';
import React from 'react';
import Resources from '../components/Resources';
import Seo from '../components/Seo';
import {Box} from '@chakra-ui/core';
import {SECTION_SPACING, getNodeMeta} from '../utils';
import {graphql} from 'gatsby';

// TODO:
// get latest odyssey course

const TITLE = 'Apollo Developer Hub';
const DESCRIPTION =
  'Learn how to write your first GraphQL query or build a production graph with our curated resources.';
const TWEET_PATTERN = /^https?:\/\/twitter.com\/\w+\/status\/(\d+)/;
export default function HomePage({data, location}) {
  const {
    featuredPost,
    odysseyCourse,
    twitchVideo,
    communityPost,
    wpEvent
  } = data;
  const posts = [odysseyCourse, twitchVideo, communityPost, wpEvent];
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
    featuredPost: wpPost {
      ...PostFragment
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
    twitchVideo {
      ...VideoFragment
    }
    communityPost {
      id
      title: topic_title
      date: updated_at(formatString: "ll")
      topic_slug
      internal {
        type
      }
    }
    wpEvent {
      id
      title
      slug
      date(formatString: "ll")
      internal {
        type
      }
      eventsMetadata {
        eventType {
          ... on WpEventType {
            slug
          }
        }
      }
    }
    odysseyCourse {
      id
      title
      url
      date: lastUpdated(formatString: "ll")
      internal {
        type
      }
    }
    allWpCollection(filter: {collectionSettings: {isUnlisted: {ne: true}}}) {
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
