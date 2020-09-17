import ArrowLink from './ArrowLink';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import striptags from 'striptags';
import {
  Box,
  Container,
  HStack,
  Heading,
  IconButton,
  Text,
  useTheme
} from '@chakra-ui/core';
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

export default function CollectionsRow({collections}) {
  const theme = useTheme();
  const [scrollIndex, setScrollIndex] = useState(0);
  return (
    <Box position="relative" overflow="hidden">
      <Container maxW="xl" px="16" whiteSpace="nowrap">
        <HStack
          spacing={COLLECTION_SPACING}
          whiteSpace="normal"
          transition="transform 250ms"
          style={{
            transform: `translateX(calc((${COLLECTION_WIDTH}px + ${
              theme.space[COLLECTION_SPACING]
            }) * ${-scrollIndex}))`
          }}
        >
          {collections.map(collection => (
            <Box flexShrink="0" w={COLLECTION_WIDTH} key={collection.id}>
              <Heading mb="1" as="h3" fontSize="2xl">
                {collection.title}
              </Heading>
              <Text
                mb="4"
                fontSize="sm"
                textStyle="clamped"
                css={{WebkitLineClamp: 3}}
              >
                {striptags(collection.content)}
              </Text>
              <ArrowLink
                to={`/collections/${collection.id}`}
                direction="right"
                fontSize="md"
                fontWeight="semibold"
              >
                +{collection.collectionSettings.items.length} more
              </ArrowLink>
            </Box>
          ))}
        </HStack>
      </Container>
      {collections.length > 0 && (
        <>
          <ArrowButton
            direction="left"
            isDisabled={!scrollIndex}
            onClick={() =>
              setScrollIndex(prevScrollIndex => prevScrollIndex - 1)
            }
          />
          <ArrowButton
            isDisabled={scrollIndex === collections.length - 1}
            onClick={() =>
              setScrollIndex(prevScrollIndex => prevScrollIndex + 1)
            }
          />
        </>
      )}
    </Box>
  );
}

CollectionsRow.propTypes = {
  collections: PropTypes.array.isRequired
};
