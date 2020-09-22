import FeedTable from '../components/FeedTable';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import {BackButton} from '../components/ArrowLink';
import {Box, Container, HStack, Heading, Link, Text} from '@chakra-ui/core';
import {Link as GatsbyLink, graphql} from 'gatsby';
import {combinePosts} from '../utils';

const MAX_PAGES_SHOWN = 9;

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
      <Container maxW="xl" px="16">
        <BackButton />
        <Box maxW="container.sm" mb="24">
          <Heading mb="4" fontSize={{base: '3xl', md: '4xl'}}>
            News Feed
          </Heading>
          <Text fontSize={{md: 'lg'}}>
            This copy should be descriptive of why this collection exists.
            Including what is in the collection – types of content that
            dominate, maybe this one is blog post heavy but has a single
            implementation item making it more of an overview type of
            collection. If we know what the collection includes we can present
            it as tailored to a skill.
          </Text>
        </Box>
        <FeedTable posts={posts} swapDate />
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
