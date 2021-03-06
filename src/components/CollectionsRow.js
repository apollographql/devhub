import ArrowLink from './ArrowLink';
import CollectionCard from './CollectionCard';
import FeedTable from './FeedTable';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {
  Box,
  ButtonGroup,
  Container,
  HStack,
  IconButton,
  useEventListener,
  useTheme
} from '@chakra-ui/core';
import {CONTAINER_PADDING_X} from '../utils';
import {IconBack} from '@apollo/space-kit/icons/IconBack';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';

const COLLECTION_WIDTH = 320;
const COLLECTION_SPACING = 4;
const MAX_ITEMS_SHOWN = 3;

function ArrowButton({icon, ...props}) {
  return (
    <IconButton
      borderRadius="full"
      icon={<Box as={icon} h="1em" />}
      {...props}
    />
  );
}

ArrowButton.propTypes = {
  icon: PropTypes.object.isRequired
};

function CollectionLink({collection, showPlus, ...props}) {
  const surplus = collection.collectionSettings.items.length - MAX_ITEMS_SHOWN;
  return (
    <ArrowLink
      to={`/collection/${collection.slug}`}
      direction="right"
      {...props}
    >
      {showPlus && surplus > 0 ? `+${surplus} more` : 'Go to collection'}
    </ArrowLink>
  );
}

CollectionLink.propTypes = {
  showPlus: PropTypes.bool,
  collection: PropTypes.object.isRequired
};

export default function CollectionsRow({collections, ...props}) {
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedCollection = collections[selectedIndex];

  useEventListener('keydown', event => {
    const isArrowLeft = event.key === 'ArrowLeft';
    if (isArrowLeft || event.key === 'ArrowRight') {
      const direction = isArrowLeft ? -1 : 1;
      setSelectedIndex(prevSelectedIndex =>
        Math.max(
          0,
          Math.min(collections.length - 1, prevSelectedIndex + direction)
        )
      );
    }
  });

  return (
    <>
      <Box position="relative" mt="12" overflow="hidden" {...props}>
        <Container maxW="xl" px={CONTAINER_PADDING_X} whiteSpace="nowrap">
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
                    h="16"
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
                    textAlign="left"
                    outline="none"
                    onClick={() => setSelectedIndex(index)}
                    collection={collection}
                    borderWidth="1px"
                    borderColor={isSelected ? 'indigo.200' : 'transparent'}
                    boxShadow={isSelected ? 'lg' : 'none'}
                    bg={isSelected ? 'white' : 'gray.50'}
                    _hover={!isSelected && {bg: 'gray.100'}}
                  >
                    <CollectionLink
                      collection={collection}
                      mt="auto"
                      fontSize="md"
                      fontWeight="semibold"
                    />
                  </CollectionCard>
                </Box>
              );
            })}
          </HStack>
          {collections.length > 0 && (
            <ButtonGroup size="sm" my="4">
              <ArrowButton
                icon={IconBack}
                isDisabled={!selectedIndex}
                onClick={() =>
                  setSelectedIndex(prevSelectedIndex => prevSelectedIndex - 1)
                }
              />
              <ArrowButton
                icon={IconProceed}
                isDisabled={selectedIndex === collections.length - 1}
                onClick={() =>
                  setSelectedIndex(prevSelectedIndex => prevSelectedIndex + 1)
                }
              />
            </ButtonGroup>
          )}
        </Container>
      </Box>
      <Container maxW="xl" px={CONTAINER_PADDING_X}>
        <Box borderTopWidth="1px" pt="8">
          <FeedTable
            posts={selectedCollection.collectionSettings.items.slice(
              0,
              MAX_ITEMS_SHOWN
            )}
          >
            <tr>
              <td />
              <td>
                <CollectionLink showPlus collection={selectedCollection} />
              </td>
            </tr>
          </FeedTable>
        </Box>
      </Container>
    </>
  );
}

CollectionsRow.propTypes = {
  collections: PropTypes.array.isRequired
};
