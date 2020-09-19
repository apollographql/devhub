import CollectionCard from './CollectionCard';
import FeedTable from './FeedTable';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Box, Container, HStack, IconButton, useTheme} from '@chakra-ui/core';
import {IconBack} from '@apollo/space-kit/icons/IconBack';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';

const COLLECTION_WIDTH = 320;
const COLLECTION_SPACING = 8;

function ArrowButton({direction = 'right', ...props}) {
  const outerProps = {[direction]: 8};
  return (
    <Box
      color="indigo.500"
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      borderRadius="full"
      boxShadow="lg"
      fontSize="md"
      bg="white"
      {...outerProps}
    >
      <IconButton
        borderRadius="inherit"
        icon={
          <Box as={direction === 'right' ? IconProceed : IconBack} h="1em" />
        }
        variant="ghost"
        {...props}
      />
    </Box>
  );
}

ArrowButton.propTypes = {
  direction: PropTypes.string
};

export default function CollectionsRow({collections, ...props}) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <>
      <Box position="relative" overflow="hidden" {...props}>
        <Container maxW="xl" px="16" whiteSpace="nowrap">
          <HStack
            align="stretch"
            spacing={COLLECTION_SPACING}
            whiteSpace="normal"
            transition="transform 250ms"
            style={{
              transform: `translateX(calc((${COLLECTION_WIDTH}px + ${
                theme.space[COLLECTION_SPACING]
              }) * ${-selectedIndex}))`
            }}
          >
            {collections.map((collection, index) => (
              <Box
                flexShrink="0"
                w={COLLECTION_WIDTH}
                key={collection.id}
                position="relative"
              >
                {index === selectedIndex && (
                  <Box
                    w="1"
                    h="full"
                    bg="purple.500"
                    position="absolute"
                    top="0"
                    left="-4"
                  />
                )}
                <CollectionCard
                  as="button"
                  outline="none"
                  textAlign="left"
                  onClick={() => setSelectedIndex(index)}
                  collection={collection}
                />
              </Box>
            ))}
          </HStack>
        </Container>
        {collections.length > 0 && (
          <>
            <ArrowButton
              direction="left"
              isDisabled={!selectedIndex}
              onClick={() =>
                setSelectedIndex(prevSelectedIndex => prevSelectedIndex - 1)
              }
            />
            <ArrowButton
              isDisabled={selectedIndex === collections.length - 1}
              onClick={() =>
                setSelectedIndex(prevSelectedIndex => prevSelectedIndex + 1)
              }
            />
          </>
        )}
      </Box>
      <Container maxW="xl" px="16">
        <FeedTable
          posts={collections[selectedIndex].collectionSettings.items}
        />
      </Container>
    </>
  );
}

CollectionsRow.propTypes = {
  collections: PropTypes.array.isRequired
};
