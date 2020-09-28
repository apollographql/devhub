import CollectionsGrid from '../components/CollectionsGrid';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {BackButton} from '../components/ArrowLink';
import {Box, Container, Heading, Tag, Text, Wrap} from '@chakra-ui/core';
import {CONTAINER_PADDING_X} from '../utils';
import {graphql} from 'gatsby';

export default function Collections({data}) {
  const [filter, setFilter] = useState({});
  const activeFilters = Object.entries(filter)
    .filter(([, value]) => Boolean(value))
    .map(([key]) => key);
  return (
    <Layout>
      <Container maxW="xl" px={CONTAINER_PADDING_X}>
        <BackButton />
        <Box maxW="container.md" mb="6">
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
        <Wrap mb={{base: 12, md: 16}}>
          <span>Filter:</span>
          <Tag
            colorScheme={activeFilters.length ? 'gray' : 'indigo'}
            as="button"
            onClick={() => setFilter({})}
          >
            All
          </Tag>
          {data.allWpCategory.nodes
            .filter(category => category.collections.nodes.length)
            .map(category => (
              <Tag
                key={category.id}
                as="button"
                colorScheme={filter[category.id] ? 'indigo' : 'gray'}
                onClick={() =>
                  setFilter(prevFilter => ({
                    ...prevFilter,
                    [category.id]: !prevFilter[category.id]
                  }))
                }
              >
                {category.name}
              </Tag>
            ))}
        </Wrap>
        <CollectionsGrid
          collections={
            activeFilters.length
              ? data.allWpCollection.nodes.filter(collection => {
                  const categoryIds = collection.categories.nodes.map(
                    category => category.id
                  );
                  return activeFilters.every(categoryId =>
                    categoryIds.includes(categoryId)
                  );
                })
              : data.allWpCollection.nodes
          }
        />
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
    allWpCategory {
      nodes {
        id
        name
        collections {
          nodes {
            id
          }
        }
      }
    }
  }
`;
