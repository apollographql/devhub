import FeedTable from '../components/FeedTable';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import Seo from '../components/Seo';
import {BackButton} from '../components/ArrowLink';
import {Box, Container, HStack, Heading, Link, Text} from '@chakra-ui/core';
import {CONTAINER_PADDING_X, combinePosts} from '../utils';
import {Link as GatsbyLink, graphql} from 'gatsby';

const MAX_PAGES_SHOWN = 9;
const TITLE = "What's new in Apollo";
const DESCRIPTION =
  'Stay in our orbit with product updates, events, blog posts, and community news.';

export default function FeedTemplate({data, pageContext}) {
  const posts = combinePosts(data);
  const {currentPage, totalPages} = pageContext;
  const pageOffset = Math.max(
    0,
    Math.min(
      totalPages - MAX_PAGES_SHOWN,
      currentPage - 1 - Math.floor(MAX_PAGES_SHOWN / 2)
    )
  );

  return (
    <Layout>
      <Seo title={TITLE} description={DESCRIPTION} />
      <Container maxW="xl" px={CONTAINER_PADDING_X}>
        <BackButton />
        <Box maxW="container.sm" mb={{base: 12, md: 16}}>
          <Heading mb="4" fontSize={{base: '3xl', md: '4xl'}}>
            {TITLE}
          </Heading>
          <Text fontSize={{md: 'lg'}}>{DESCRIPTION}</Text>
        </Box>
        <FeedTable showDate posts={posts} />
        <Box mt="16">
          <Heading
            as="h6"
            fontSize="xs"
            color="gray.500"
            textStyle="subheading"
          >
            Page
          </Heading>
          <HStack
            spacing="3"
            fontSize={{base: 'xl', md: '2xl'}}
            fontWeight="semibold"
          >
            {Array.from(Array(totalPages).keys())
              .slice(pageOffset, MAX_PAGES_SHOWN + pageOffset)
              .map(index => {
                const page = index + 1;
                return (
                  <Link
                    key={index}
                    as={GatsbyLink}
                    to={'/feed/' + page}
                    color={page === currentPage && 'indigo.500'}
                  >
                    {page}
                  </Link>
                );
              })}
          </HStack>
        </Box>
      </Container>
    </Layout>
  );
}

FeedTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query FeedQuery(
    $idWpPost: [String!]
    $idWpFeedItem: [String!]
    $idTwitchVideo: [String!]
  ) {
    allWpPost(filter: {id: {in: $idWpPost}}) {
      nodes {
        ...PostFragment
      }
    }
    allWpFeedItem(filter: {id: {in: $idWpFeedItem}}) {
      nodes {
        ...FeedItemFragment
      }
    }
    allTwitchVideo(filter: {_id: {in: $idTwitchVideo}}) {
      nodes {
        ...VideoFragment
      }
    }
  }
`;
