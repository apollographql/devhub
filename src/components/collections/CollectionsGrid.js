import CollectionCard from './CollectionCard';
import PropTypes from 'prop-types';
import React from 'react';
import {Grid} from '@chakra-ui/core';

const COLLECTIONS_GRID_STYLES = collections => ({
  gap: '4',
  templateColumns: {
    base: '1fr',
    md: 'repeat(2, 1fr)',
    lg: 'repeat(auto-fit, minmax(288px, 1fr))',
    xl: 'repeat(auto-fit, minmax(276px, 1fr))'
  },
  templateRows: {
    base: `repeat(${collections.length}, minmax(135px, 1fr))`,
    md: `repeat(${Math.ceil(collections.length / 2)}, minmax(159px, 1fr))`,
    lg: `repeat(${Math.ceil(collections.length / 3)}, minmax(186px, 1fr))`,
    xl: `repeat(${Math.ceil(collections.length / 4)}, minmax(178px, 1fr))`
  }
});

export default function CollectionsGrid({collections}) {
  return (
    <Grid
      as="ul"
      listStyleType="none"
      p="0"
      {...COLLECTIONS_GRID_STYLES(collections)}
    >
      {collections.map(collection => (
        <CollectionCard
          key={collection.id}
          collection={collection}
        ></CollectionCard>
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  collections: PropTypes.array.isRequired
};
