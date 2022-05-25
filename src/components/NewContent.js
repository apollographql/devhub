import FeedItemTitle from './FeedItemTitle';
import PropTypes from 'prop-types';
import React from 'react';
import TweetEmbed from 'react-tweet-embed';
import astronaut from '../assets/astronaut.svg';
import truncate from 'lodash/truncate';
import {ApolloLogo} from '@apollo/space-kit/icons/ApolloLogo';
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Img,
  ListItem,
  Text
} from '@chakra-ui/core';
import {IconCalendarTime} from '@apollo/space-kit/icons/IconCalendarTime';
import {IconClient} from '@apollo/space-kit/icons/IconClient';
import {IconComment} from '@apollo/space-kit/icons/IconComment';
import {IconDevelop} from '@apollo/space-kit/icons/IconDevelop';
import {IconDocument} from '@apollo/space-kit/icons/IconDocument';
import {IconHeadset} from '@apollo/space-kit/icons/IconHeadset';
import {IconOdyssey} from '@apollo/space-kit/icons/IconOdyssey';
import {IconPlanet1} from '@apollo/space-kit/icons/IconPlanet1';
import {IconTeam} from '@apollo/space-kit/icons/IconTeam';
import {IconTelescope3} from '@apollo/space-kit/icons/IconTelescope3';
import {UNDERLINE_ANIMATION, UNDERLINE_HOVER, getNodeMeta} from '../utils';

// TODO: do we want a different icon for every content type?
// or just for the more common ones and have a more generic one shared by the less common ones?
const contentTypes = {
  'Blog post': IconPlanet1,
  Stream: IconTelescope3,
  Podcast: IconHeadset, // idea, not in figma design
  Tweet: null,
  Talk: null,
  Panel: IconTeam, // idea, not in figma design
  Docs: IconDocument,
  Code: IconDevelop, // idea, not in figma design
  Video: null,
  Tutorial: null,
  Guide: null,
  Website: IconClient, // idea, not in figma design
  'Odyssey Course': IconOdyssey,
  Community: IconComment,
  Event: IconCalendarTime
};

function FeaturedPost({
  featuredPost,
  featuredPostMeta,
  tweetMatches,
  featuredImage,
  location,
  ...props
}) {
  const author = featuredPost.author.node.name;
  return (
    <ListItem {...props}>
      <Box w="full" gridColumn={{lg: '1 / span 2', xl: '1'}}>
        {tweetMatches ? (
          <TweetEmbed id={tweetMatches[1]} />
        ) : featuredImage ? (
          <Box
            w="full"
            as="img"
            src={featuredImage}
            alt={featuredPost.title}
            borderRadius="4px"
          />
        ) : null}
      </Box>
      <Box alignSelf="center">
        <Flex align="center" mb="4">
          <Center w="1rem" h="1rem" mr="2">
            <Box
              as={contentTypes[featuredPostMeta.type] || ApolloLogo}
              w="full"
              sx={{
                g: {
                  strokeWidth: '1'
                }
              }}
            />
          </Center>
          <Heading textStyle="subheading" fontSize="xs" as="h6">
            Featured <Box as="span">{featuredPostMeta.type}</Box>
          </Heading>
        </Flex>

        <FeedItemTitle
          url={featuredPostMeta.url}
          mb="4"
          as="h3"
          fontSize="lg"
          w={featuredPostMeta.url && 'full'}
        >
          {featuredPost.title}
        </FeedItemTitle>

        <Text fontSize="sm">
          {featuredPost.date} - {author}
        </Text>
      </Box>
    </ListItem>
  );
}

FeaturedPost.propTypes = {
  featuredPost: PropTypes.object.isRequired,
  featuredPostMeta: PropTypes.object.isRequired,
  tweetMatches: PropTypes.array,
  featuredImage: PropTypes.string,
  location: PropTypes.object.isRequired
};

export default function NewContent({
  featuredPost,
  featuredPostMeta,
  tweetMatches,
  featuredImage,
  location,
  posts
}) {
  return (
    <Box>
      <Box mb="6" pos="relative">
        <Heading as="h2" fontSize="2xl" mb="1">
          What&apos;s New in Apollo
        </Heading>
        <Text>
          Stay in our orbit with product updates, events, blog posts, and
          conmmunity news
        </Text>
        <Box
          display={{base: 'none', lg: 'block'}}
          w={{lg: '205px', xl: '276px'}}
          h={{lg: '200px', xl: '270px'}}
          pos="absolute"
          top="0"
          right="0"
        >
          <Img src={astronaut} alt="Astronaut" />
        </Box>
      </Box>

      <Grid
        as="ul"
        listStyleType="none"
        ml="0"
        borderRadius="4px"
        gap="6"
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(4, 1fr)'
        }}
        templateRows={{
          base: '1fr repeat(auto-fit, minmax(139px, 1fr))',
          lg: '1fr repeat(auto-fit, minmax(198px, 1fr))',
          xl: '1fr repeat(auto-fit, minmax(171px, 1fr))'
        }}
      >
        <FeaturedPost
          featuredPost={featuredPost}
          featuredPostMeta={featuredPostMeta}
          tweetMatches={tweetMatches}
          featuredImage={featuredImage}
          location={location}
          display="grid"
          gridGap="6"
          gridTemplateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
            xl: 'repeat(2, 1fr)'
          }}
          gridColumn={{md: '1 / span 2', lg: '1 / span 3'}}
        />

        {posts.map((post, i) => {
          const {date, title} = post;
          const {type, url} = getNodeMeta(post);
          return (
            <ListItem
              key={post.id}
              borderWidth="1px"
              borderColor="gray.200"
              borderRadius="8px"
              h="100%"
              sx={
                !i && {
                  gridColumn: 1
                }
              }
            >
              <Flex
                as="a"
                href={url}
                direction="column"
                w="full"
                h="full"
                p="6"
                _hover={{
                  h5: UNDERLINE_HOVER
                }}
                _focus={{
                  h5: UNDERLINE_HOVER
                }}
              >
                <Flex alignItems="center" h="4" mb="4">
                  <Flex alignItems="center" boxSize="4" mr="2">
                    <Box
                      w="full"
                      mr="2"
                      sx={{g: {strokeWidth: 1}}}
                      as={contentTypes[type] || ApolloLogo}
                    />
                  </Flex>
                  <Heading
                    textStyle="subheading"
                    fontSize="xs"
                    fontStyle="normal"
                    as="h6"
                  >
                    {type}
                  </Heading>
                </Flex>

                {/* Heading wrapper w/ a width needed for underline hover animation */}
                <Box w="full" mb={{lg: '4'}}>
                  <Heading as="h5" fontSize="lg" {...UNDERLINE_ANIMATION}>
                    {truncate(title, {length: 80})}
                  </Heading>
                </Box>
                <Text fontSize="sm" mt={{base: '2', lg: 'auto'}}>
                  {date}
                </Text>
              </Flex>
            </ListItem>
          );
        })}
      </Grid>
    </Box>
  );
}

NewContent.propTypes = {
  featuredPost: PropTypes.object.isRequired,
  featuredPostMeta: PropTypes.object.isRequired,
  tweetMatches: PropTypes.array,
  featuredImage: PropTypes.string,
  location: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};
