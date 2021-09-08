import CollectionsGrid from '../components/collections/CollectionsGrid';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import Seo from '../components/Seo';
import {BackButton} from '../components/ArrowLink';
import {Box, Container, Heading, Tag, Text, Wrap} from '@chakra-ui/core';
import {CONTAINER_PADDING_X} from '../utils';
import {graphql} from 'gatsby';

function FilterTag({isSelected, ...props}) {
  return (
    <Tag
      as="button"
      variant={isSelected ? 'outline' : 'subtle'}
      colorScheme={isSelected ? 'indigo' : 'gray'}
      {...props}
    />
  );
}

FilterTag.propTypes = {
  isSelected: PropTypes.bool
};

const DESCRIPTION =
  "Looking for resources on federation, caching, or learning Apollo? We've grouped our favorite posts, videos, tutorials, and docs into collections to help you solve common GraphQL challenges.";

export default function Collections({data}) {
  const [filter, setFilter] = useState({});
  const hasFilters = Object.entries(filter).some(([, value]) => value);
  return (
    <Layout>
      <Seo title="Collections" description={DESCRIPTION} />
      <Container maxW="xl" px={CONTAINER_PADDING_X}>
        <BackButton />
        <Box maxW="container.md" mb="6">
          <Heading mb="4" fontSize={{base: '3xl', md: '4xl'}}>
            Apollo Collections
          </Heading>
          <Text fontSize={{md: 'lg'}}>{DESCRIPTION}</Text>
        </Box>
        <Wrap mb={{base: 12, md: 16}}>
          <span>Filter:</span>
          <FilterTag
            isSelected={!hasFilters}
            as="button"
            onClick={() => setFilter({})}
          >
            All
          </FilterTag>
          {data.allWpCategory.nodes
            .filter(category => category.collections.nodes.length)
            .map(category => (
              <FilterTag
                key={category.id}
                as="button"
                isSelected={filter[category.id]}
                onClick={() =>
                  setFilter(prevFilter => ({
                    ...prevFilter,
                    [category.id]: !prevFilter[category.id]
                  }))
                }
              >
                {category.name}
              </FilterTag>
            ))}
        </Wrap>
        <CollectionsGrid
          collections={
            hasFilters
              ? data.allWpCollection.nodes.filter(collection =>
                  collection.categories.nodes.some(
                    category => filter[category.id]
                  )
                )
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
    allWpCollection(
      filter: {collectionSettings: {isUnlisted: {ne: true}}}
      sort: {fields: date, order: DESC}
    ) {
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
