import CollectionCard from './CollectionCard';
import PropTypes from 'prop-types';
import React from 'react';
import {Grid} from '@chakra-ui/core';

export default function CollectionsGrid({collections}) {
  return (
    <Grid gap="8" templateColumns="repeat(auto-fill, minmax(265px, 1fr))">
      {collections.map(collection => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </Grid>
  );
}

CollectionsGrid.propTypes = {
  collections: PropTypes.array.isRequired
};
