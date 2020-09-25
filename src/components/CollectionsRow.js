import CollectionCard from './CollectionCard';
import FeedTable from './FeedTable';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {Box, Container, HStack, IconButton, useTheme} from '@chakra-ui/core';
import {IconBack} from '@apollo/space-kit/icons/IconBack';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';

const COLLECTION_WIDTH = 320;
const COLLECTION_SPACING = 4;

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
      <Box position="relative" py="4" overflow="hidden" {...props}>
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
            {collections.map((collection, index) => {
              const isSelected = selectedIndex === index;
              return (
                <CollectionCard
                  flexShrink="0"
                  w={COLLECTION_WIDTH}
                  key={collection.id}
                  as="button"
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  textAlign="left"
                  outline="none"
                  onClick={() => setSelectedIndex(index)}
                  collection={collection}
                  borderWidth="1px"
                  borderColor={isSelected ? 'indigo.100' : 'transparent'}
                  boxShadow={isSelected ? 'lg' : 'none'}
                  bg={isSelected ? 'white' : 'gray.50'}
                  p="4"
                  borderRadius="lg"
                  _hover={!isSelected && {bg: 'indigo.50'}}
                />
              );
            })}
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
