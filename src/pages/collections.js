import CollectionsGrid from '../components/CollectionsGrid';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import {BackButton} from '../components/ArrowLink';
import {Box, Container, Heading, Text} from '@chakra-ui/core';
import {graphql} from 'gatsby';

export default function Collections({data}) {
  return (
    <Layout>
      <Container maxW="xl" px="16">
        <BackButton />
        <Box maxW="container.md" mb="20">
          <Heading mb="4" fontSize={{base: '3xl', md: '4xl'}}>
            Apollo Collections
          </Heading>
          <Text fontSize={{md: 'lg'}}>
            This copy should be descriptive of why this collection exists.
            Including what is in the collection – types of content that
            dominate, maybe this one is blog post heavy but has a single
            implementation item making it more of an overview type of
            collection. If we know what the collection includes we can present
            it as tailored to a skill or depth of knowledge level.
          </Text>
        </Box>
        <CollectionsGrid collections={data.allWpCollection.nodes} />
      </Container>
    </Layout>
  );
}

Collections.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CollectionsQuery {
    allWpCollection(sort: {fields: date, order: DESC}) {
      nodes {
        ...CollectionFragment
      }
    }
  }
`;
