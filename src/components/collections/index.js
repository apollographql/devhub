import PropTypes from 'prop-types';
import React from 'react';
import {Box, Flex, Grid, Heading, ListItem, Tag, Text} from '@chakra-ui/core';
import {Link as GatsbyLink} from 'gatsby';
import {SECTION_SPACING} from '../../utils';

const CARD_STYLES = {
  borderWidth: '1px',
  borderColor: 'gray.200',
  borderRadius: '8px',
  bg: 'white',
  transition: 'transform 0.3s'
};

const OFFSET = 4;
const PSEUDO_STYLES = isBottomCard => {
  const offsetPos = `${(isBottomCard ? 2 : 1) * OFFSET}px`;
  return {
    ...CARD_STYLES,
    content: "''",
    pos: 'absolute',
    top: 0,
    left: 0,
    w: 'full',
    h: 'full',
    transform: `translate(calc(-1 * ${offsetPos}), ${offsetPos})`
  };
};

function Card({collection}) {
  const author = collection.author.node.name;
  return (
    <ListItem
      h="full"
      pos="relative"
      _before={{...PSEUDO_STYLES(false), zIndex: 1}}
      _after={PSEUDO_STYLES(true)}
      _hover={{
        _after: {
          transform: `translate(calc(-1 * ${OFFSET}px * 3), calc(${OFFSET}px * 3))`
        },
        a: {
          transform: `translate(${OFFSET}px, calc(-1 * ${OFFSET}px))`
        }
      }}
    >
      <Box
        as={GatsbyLink}
        to={`/collection/${collection.slug}`}
        {...CARD_STYLES}
        w="full"
        h="full"
        zIndex={1}
        pos="relative"
        p="6"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Heading fontSize="lg">{collection.title}</Heading>
        <Text fontSize="sm" mt="2">
          By {author}
        </Text>
        <Flex
          as="ul"
          ml="0"
          mt={{
            base: collection.categories.nodes.length > 3 ? '6' : 'auto',
            md: collection.categories.nodes.length > 4 ? '6' : 'auto',
            xl: collection.categories.nodes.length > 3 ? '6' : 'auto'
          }}
          listStyleType="none"
          flexWrap="wrap"
        >
          {collection.categories.nodes.map(({name}) => (
            <ListItem
              key={name}
              mt="2"
              sx={{
                ':not(:last-child)': {
                  mr: '2'
                }
              }}
            >
              <Tag
                bg="indigo.50"
                p="1"
                fontSize="xs"
                textTransform="uppercase"
                fontWeight="600"
              >
                {name}
              </Tag>
            </ListItem>
          ))}
        </Flex>
      </Box>
    </ListItem>
  );
}

Card.propTypes = {
  collection: PropTypes.object.isRequired
};

export default function Collections({collections}) {
  return (
    <Box
      w="full"
      bg="gray.50"
      pt={{base: '8', lg: '40px'}}
      pb={{base: '40px', lg: '12'}}
      mb={{base: '8', lg: '40px', '2xl': '8'}}
    >
      <Box as="section" id="collections" {...SECTION_SPACING}>
        <Heading as="h2" fontSize="2xl" mb="2">
          <a href="#collections">Apollo Collections</a>
        </Heading>
        <Text mb="6" fontSize={{md: 'lg'}} w={{base: 'full', lg: '50%'}}>
          Looking for resources on federation, caching, or other special topics?
          We&apos;ve grouped our favorite posts, videos, tutorials, and docs
          into collections to help you solve common GraphQL challenges.
        </Text>

        <Grid
          as="ul"
          listStyleType="none"
          ml="0"
          gap="4"
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(auto-fit, minmax(288px, 1fr))',
            xl: 'repeat(auto-fit, minmax(276px, 1fr))'
          }}
          templateRows={{
            base: `repeat(${collections.length}, minmax(135px, 1fr))`,
            md: `repeat(${Math.ceil(
              collections.length / 2
            )}, minmax(159px, 1fr))`,
            lg: `repeat(${Math.ceil(
              collections.length / 3
            )}, minmax(186px, 1fr))`,
            xl: `repeat(${Math.ceil(
              collections.length / 4
            )}, minmax(178px, 1fr))`
          }}
        >
          {collections.map(collection => (
            <Card key={collection.id} collection={collection} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

Collections.propTypes = {
  collections: PropTypes.array.isRequired
};
