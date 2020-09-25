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
  return (
    <IconButton
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      borderRadius="full"
      boxShadow="lg"
      icon={<Box as={direction === 'right' ? IconProceed : IconBack} h="1em" />}
      sx={{[direction]: 8}}
      colorScheme="indigo"
      {...props}
    />
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
      <Box position="relative" py="10" overflow="hidden" {...props}>
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
                <Box key={collection.id} position="relative">
                  <Box
                    h="10"
                    w="px"
                    css={({theme}) => ({
                      backgroundImage: `linear-gradient(${[
                        theme.colors.indigo[200],
                        theme.colors.gray[200]
                      ]})`
                    })}
                    position="absolute"
                    top="100%"
                    left="50%"
                    transition="opacity 250ms"
                    style={{opacity: Number(isSelected)}}
                  />
                  <CollectionCard
                    flexShrink="0"
                    h="full"
                    w={COLLECTION_WIDTH}
                    as="button"
                    display="flex"
                    alignItems="flex-start"
                    flexDirection="column"
                    textAlign="left"
                    outline="none"
                    onClick={() => setSelectedIndex(index)}
                    collection={collection}
                    borderWidth="1px"
                    borderColor={isSelected ? 'indigo.200' : 'transparent'}
                    boxShadow={isSelected ? 'lg' : 'none'}
                    bg={isSelected ? 'white' : 'gray.50'}
                    p="4"
                    borderRadius="lg"
                    _hover={!isSelected && {bg: 'indigo.50'}}
                  />
                </Box>
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
        <Box borderTopWidth="1px" pt="8">
          <FeedTable
            posts={collections[selectedIndex].collectionSettings.items}
          />
        </Box>
      </Container>
    </>
  );
}

CollectionsRow.propTypes = {
  collections: PropTypes.array.isRequired
};
