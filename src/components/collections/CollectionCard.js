import PropTypes from 'prop-types';
import React from 'react';
import {Box, Flex, Heading, ListItem, Tag, Text} from '@chakra-ui/core';
import {Link as GatsbyLink, graphql} from 'gatsby';

const CARD_STYLES = {
  borderWidth: '1px',
  borderColor: 'gray.200',
  borderRadius: 'lg',
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
    boxSize: 'full',
    transform: `translate(calc(-1 * ${offsetPos}), ${offsetPos})`
  };
};

export default function CollectionCard({collection}) {
  const author = collection.author.node.name;
  return (
    <ListItem
      minH={{base: '135px', md: '159px', lg: '186px', xl: '178px'}}
      pos="relative"
      zIndex="0"
      _before={{...PSEUDO_STYLES(false), zIndex: 1}}
      _after={PSEUDO_STYLES(true)}
      _hover={{
        transition: 'all 0.3s',
        '@media screen and (prefers-reduced-motion: no-preference)': {
          _after: {
            transform: `translate(calc(-1 * ${OFFSET}px * 3), calc(${OFFSET}px * 3))`
          },
          a: {
            transform: `translate(${OFFSET}px, calc(-1 * ${OFFSET}px))`
          }
        },
        '@media screen and (prefers-reduced-motion)': {
          a: {borderColor: 'indigo.500'}
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
        <Text fontSize="sm" mt="2" mb="6">
          By {author}
        </Text>
        <Flex as="ul" ml="0" mt="auto" listStyleType="none" flexWrap="wrap">
          {collection.categories.nodes.map(({name}) => (
            <ListItem
              key={name}
              mt="2"
              fontFamily="mono"
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
                fontWeight="semibold"
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

CollectionCard.propTypes = {
  collection: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  fragment CollectionFragment on WpCollection {
    id
    slug
    title
    content
    author {
      node {
        name
      }
    }
    categories {
      nodes {
        id
        name
      }
    }
    collectionSettings {
      items {
        ... on WpPost {
          ...PostFragment
        }
        ... on WpFeedItem {
          ...FeedItemFragment
        }
      }
    }
  }
`;
