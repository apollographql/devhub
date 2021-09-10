import PropTypes from 'prop-types';
import React from 'react';
import {Box, Center, Grid, Heading, Text} from '@chakra-ui/core';
import {IconCalendarTime} from '@apollo/space-kit/icons/IconCalendarTime';
import {IconComment} from '@apollo/space-kit/icons/IconComment';
import {IconDocument} from '@apollo/space-kit/icons/IconDocument';
import {IconOdyssey} from '@apollo/space-kit/icons/IconOdyssey';
import {IconPlanet1} from '@apollo/space-kit/icons/IconPlanet1';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';

const resources = [
  {
    title: 'Docs',
    description: 'Go in-depth with conceptual guides and API reference.',
    href: 'http://apollographql.com/docs',
    icon: IconDocument
  },
  {
    title: 'Odyssey',
    description: 'Learn GraphQL with our practical, hands-on trainings',
    href: 'http://odyssey.apollographql.com',
    icon: IconOdyssey
  },
  {
    title: 'Blog',
    description:
      'Stay up to date on news, updates, and articles from our team.',
    href: 'http://apollographql.com/blog',
    icon: IconPlanet1
  },
  {
    title: 'Community',
    description: "Share questions, comments, or topics you'd like to discuss.",
    href: 'http://community.apollographql.com',
    icon: IconComment
  },
  {
    title: 'Events',
    description:
      'Join us for tech talks, virtual events, product updates, and more.',
    href: 'https://www.apollographql.com/events/',
    icon: IconCalendarTime
  }
];

export default function Resources() {
  return (
    <Box
      as="section"
      w="full"
      mb={{base: '28px', sm: '8', lg: '40px', '2xl': '12'}}
    >
      <Heading as="h2" fontSize="2xl" mb="2">
        Explore our resources
      </Heading>
      <Text mb="6">
        Not sure where to start? We&apos;ve got multiple ways to learn.
      </Text>
      <Grid
        as="ul"
        listStyleType="none"
        w="full"
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(auto-fit, minmax(288px, 1fr))',
          xl: 'repeat(auto-fit, minmax(217px, 1fr))'
        }}
        gap="4"
      >
        {resources.map(resource => (
          <Card key={resource.title} resource={resource} />
        ))}
      </Grid>
    </Box>
  );
}

function Card({resource}) {
  const {href, icon, title, description} = resource;

  return (
    <Box
      as="li"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="8px"
      w="full"
      h={{base: '76px', lg: '183px', xl: '207px'}}
    >
      <Box
        as="a"
        href={href}
        p={{base: '4', lg: '6'}}
        w="full"
        h="full"
        display={{base: 'grid', lg: 'inline-block'}}
        gridTemplateColumns="44px 1fr 20px"
        gridGap="4"
        alignItems="center"
        justifyContent="flex-start"
      >
        <Center
          p="3"
          bg="blilet.50"
          borderRadius="4px"
          w="44px"
          h="44px"
          mb={{base: '0', lg: '3'}}
        >
          <Box as={icon} color="indigo.600" />
        </Center>
        <Heading as="h3" fontWeight="600" fontSize="1.125rem" mb="1">
          {title}
        </Heading>
        <Text display={{base: 'none', lg: 'block'}}>{description}</Text>
        <Center w="20px" h="20px" p="1" display={{lg: 'none'}}>
          <Box as={IconProceed} w="full" h="full" />
        </Center>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  resource: PropTypes.object.isRequired
};
