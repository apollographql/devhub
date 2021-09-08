import CollectionCard from './CollectionCard';
import PropTypes from 'prop-types';
import React from 'react';
import {Link as GatsbyLink} from 'gatsby';
import {Grid, Tag, Wrap} from '@chakra-ui/core';

export default function CollectionsGrid({collections}) {
  return (
    <Grid
      gap={{base: 6, md: 8}}
      templateColumns="repeat(auto-fill, minmax(265px, 1fr))"
    >
      {collections.map(collection => (
        <CollectionCard
          key={collection.id}
          collection={collection}
          as={GatsbyLink}
          to={'/collection/' + collection.slug}
          bg="gray.50"
          _hover={{bg: 'gray.100'}}
        >
          <Wrap mt="auto">
            {collection.categories.nodes.map(category => (
              <Tag
                size="sm"
                borderRadius="md"
                key={category.id}
                variant="outline"
                colorScheme="indigo"
              >
                {category.name}
              </Tag>
            ))}
          </Wrap>
        </CollectionCard>
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  collections: PropTypes.array.isRequired
};
