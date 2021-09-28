import CollectionsGrid from '../components/collections/CollectionsGrid';
import FeedTable from '../components/FeedTable';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import React from 'react';
import Seo from '../components/Seo';
import parse from 'html-react-parser';
import striptags from 'striptags';
import {BackButton} from '../components/ArrowLink';
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Tag,
  Text,
  Wrap
} from '@chakra-ui/core';
import {CONTAINER_PADDING_X} from '../utils';
import {graphql} from 'gatsby';

export default function CollectionTemplate({data}) {
  const {node: author} = data.collection.author;
  return (
    <Layout>
      <Seo
        title={data.collection.title}
        description={data.collection.categories.nodes
          .map(category => '#' + category.name.toLowerCase())
          .join(' ')}
      />
      <Container maxW="xl" px={CONTAINER_PADDING_X}>
        <BackButton to="/collections">Collections</BackButton>
        <Heading mb="4" fontSize={{base: '3xl', md: '4xl'}}>
          {data.collection.title}
        </Heading>
        <Grid
          mb="16"
          gap="16"
          templateColumns={{
            base: '1fr',
            md: '2fr 1fr'
          }}
        >
          <div>
            <Stack
              fontSize={{md: 'lg'}}
              sx={{
                code: {
                  px: 1,
                  bg: 'indigo.50',
                  fontSize: '0.9em',
                  color: 'indigo.500',
                  borderRadius: 'md'
                }
              }}
            >
              {parse(data.collection.content)}
            </Stack>
            {data.collection.categories.nodes.length && (
              <Wrap mt="4">
                {data.collection.categories.nodes.map(category => (
                  <Tag variant="outline" colorScheme="indigo" key={category.id}>
                    {category.name}
                  </Tag>
                ))}
              </Wrap>
            )}
          </div>
          <Box display={{base: 'none', md: 'block'}}>
            <Text fontFamily="mono" color="gray.500" position="relative">
              <Box
                as="span"
                position="absolute"
                top="0"
                left="0"
                fontSize="90px"
                fontFamily="mono"
                fontWeight="bold"
                color="indigo.50"
                lineHeight="1"
                transform="translate(-55%, calc(-100% / 3))"
                userSelect="none"
              >
                &ldquo;
              </Box>
              <Box as="span" position="relative">
                {striptags(data.collection.excerpt).trim()}
              </Box>
            </Text>
            <Flex align="center" mt="4">
              <Box
                as="img"
                borderRadius="lg"
                boxSize="8"
                mr="2"
                src={
                  author.userMetadata.avatarId
                    ? author.userMetadata.avatarId.sourceUrl
                    : author.avatar.url
                }
              />
              <Box fontSize="sm" lineHeight="shorter">
                {author.name}
                <br />
                <Box as="span" color="gray.500">
                  {author.userMetadata.title}
                </Box>
              </Box>
            </Flex>
          </Box>
        </Grid>
        <FeedTable posts={data.collection.collectionSettings.items} />
        {data.relatedCollections.nodes.length > 0 && (
          <>
            <Heading mt="20" as="h3" mb="6" fontSize="3xl">
              Related collections
            </Heading>
            <CollectionsGrid collections={data.relatedCollections.nodes} />
          </>
        )}
      </Container>
    </Layout>
  );
}

CollectionTemplate.propTypes = {
  data: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query CollectionQuery($id: String!, $categoryIds: [String!]!) {
    collection: wpCollection(id: {eq: $id}) {
      ...CollectionFragment
      excerpt
      author {
        node {
          name
          avatar {
            url
          }
          userMetadata {
            title
            avatarId {
              sourceUrl
            }
          }
        }
      }
    }
    relatedCollections: allWpCollection(
      filter: {
        id: {ne: $id}
        categories: {nodes: {elemMatch: {id: {in: $categoryIds}}}}
      }
    ) {
      nodes {
        ...CollectionFragment
      }
    }
  }
`;
