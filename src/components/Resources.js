import PropTypes from 'prop-types';
import React, {useState} from 'react';
import useResizeObserver from 'use-resize-observer';
import {
  Box,
  Center,
  Grid,
  Heading,
  Text,
  useBreakpointValue
} from '@chakra-ui/core';
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
      // mb={{base: '28px', sm: 8, lg: 6, '2xl': 12}}
      mb="6"
    >
      <Heading as="h2" fontSize="2xl" mb="1">
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

const ICON_WRAPPER_DIMENSIONS = {
  boxSize: 44,
  borderRadius: 'md'
};

const COLOR_FILL_ANIMATIONS = {
  transition: 'all 0.3 ease-out',

  '@media screen and (prefers-reduced-motion: no-preference)': {
    '.overlay': {
      transform: 'scale(1)',
      borderRadius: 0
    }
  },

  '@media screen and (prefers-reduced-motion)': {
    borderColor: 'indigo.500'
  }
};
function Card({resource}) {
  const cardHeight = useBreakpointValue({
    base: 76,
    lg: 183,
    xl: 207
  });
  const {ref, width} = useResizeObserver({box: 'border-box'});
  const [scale, setScale] = useState({x: 0, y: 0});
  const {href, icon, title, description} = resource;

  React.useEffect(() => {
    if (cardHeight) {
      const scaleX = ICON_WRAPPER_DIMENSIONS.boxSize / width;
      const scaleY = ICON_WRAPPER_DIMENSIONS.boxSize / cardHeight;

      setScale({x: scaleX, y: scaleY});
    }
  }, [width, cardHeight]);

  return (
    <Box as="li" w="full" h={cardHeight}>
      <Box
        as="a"
        ref={ref}
        href={href}
        p={{base: '4', lg: '6'}}
        w="full"
        h="full"
        display={{base: 'grid', lg: 'inline-block'}}
        gridTemplateColumns={`${ICON_WRAPPER_DIMENSIONS.boxSize}px 1fr 20px`}
        gridGap="4"
        alignItems="center"
        justifyContent="flex-start"
        pos="relative"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="lg"
        overflow="hidden"
        _hover={COLOR_FILL_ANIMATIONS}
        _active={COLOR_FILL_ANIMATIONS}
        _focus={COLOR_FILL_ANIMATIONS}
      >
        <Box
          className="overlay"
          borderRadius="1.5rem" // arbitrary "big" border radius to hide behind icon-wrapper
          boxSize="full"
          pos="absolute"
          bg="blilet.50"
          top="0"
          left="0"
          transform={{
            base: `translate(1rem, 1rem) scale(${scale.x}, ${scale.y})`, // 1rem matches link padding
            lg: `translate(1.5rem, 1.5rem) scale(${scale.x}, ${scale.y})` // 1.5rem matches link padding
          }}
          transition="transform 0.3s ease-out"
          transformOrigin="top left"
        />
        <Center
          className="icon-wrapper"
          {...ICON_WRAPPER_DIMENSIONS}
          p="3"
          mb={{base: '0', lg: '3'}}
          bg="blilet.50"
          borderWidth="1px"
          borderColor="white"
          pos="relative"
          transition="all 0.3s ease-out"
        >
          <Box as={icon} color="indigo.600" />
        </Center>
        <Box className="text" pos="relative" transition="color 0.3s ease-out">
          <Heading as="h3" fontWeight="600" fontSize="lg" mb="1">
            {title}
          </Heading>
          <Text display={{base: 'none', lg: 'block'}}>{description}</Text>
        </Box>
        <Center boxSize="20px" p="1" pos="relative" display={{lg: 'none'}}>
          <Box as={IconProceed} w="full" h="full" />
        </Center>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  resource: PropTypes.object.isRequired
};
