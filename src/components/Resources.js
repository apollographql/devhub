import PropTypes from 'prop-types';
import React, {useState} from 'react';
import useDimensions from '../hooks/useDimensions';
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

const ICON_WRAPPER_DIMENSIONS = {
  w: '44px',
  h: '44px',
  borderRadius: '4px'
};

const COLOR_FILL_ANIMATIONS = {
  transition: 'all 0.3 ease-out',
  transform: 'translateZ(0)',

  '.overlay': {
    transform: 'scale(8) translateZ(0)'
  },

  '.icon-wrapper:after': {
    background: 'blilet.50'
  }
};
function Card({resource}) {
  const cardHeight = useBreakpointValue({
    base: '76px',
    lg: '183px',
    xl: '207px'
  });
  const [cardRef, {width}] = useDimensions();
  const [scale, setScale] = useState({});
  const {href, icon, title, description} = resource;

  React.useEffect(() => {
    if (cardHeight) {
      const cardHght = Number(cardHeight.slice(0, -2));
      const scaleX = Math.ceil(width / 44) + 1;
      const scaleY = Math.ceil(cardHght / 44) + 1;

      setScale({x: scaleX, y: scaleY});
    }
  }, [width, cardHeight]);

  return (
    <Box
      as="li"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="8px"
      w="full"
      h={cardHeight}
      overflow="hidden"
    >
      <Box
        as="a"
        ref={cardRef}
        href={href}
        p={{base: '4', lg: '6'}}
        w="full"
        h="full"
        display={{base: 'grid', lg: 'inline-block'}}
        gridTemplateColumns="44px 1fr 20px"
        gridGap="4"
        alignItems="center"
        justifyContent="flex-start"
        pos="relative"
        _hover={{
          ...COLOR_FILL_ANIMATIONS,
          '.overlay': {
            transform: `scale(${scale.x}, ${scale.y}) translateZ(0)`
          }
        }}
        _active={COLOR_FILL_ANIMATIONS}
        _focus={COLOR_FILL_ANIMATIONS}
      >
        <Box
          className="overlay"
          {...ICON_WRAPPER_DIMENSIONS}
          position="absolute"
          bg="blilet.50"
          top={{base: '18px', lg: '25px'}}
          left={{base: '18px', lg: '25px'}}
          z-index="0"
          transition="transform 0.3s ease-out"
          transformOrigin={{base: '10% 30%', md: '12% 30%'}} // TODO: find better values than just guess and check
        />
        <Center
          className="icon-wrapper"
          {...ICON_WRAPPER_DIMENSIONS}
          w="46px"
          h="46px"
          p="3"
          mb={{base: '0', lg: '3'}}
          bg="white"
          borderWidth="1px"
          borderColor="transparent"
          pos="relative"
          zIndex="1"
          transition="all 0.3s ease-out"
          _after={{
            ...ICON_WRAPPER_DIMENSIONS,
            content: "''",
            display: 'block',
            position: 'absolute',
            background: 'blilet.50',
            borderRadius: '3px',
            top: '0',
            left: '0',
            transition: 'opacity 0.3s ease-out'
          }}
        >
          <Box
            as={icon}
            color="indigo.600"
            zIndex="2"
            transform="translateZ(0)"
          />
        </Center>
        <Box
          className="text"
          zIndex="2"
          pos="relative"
          transition="color 0.3s ease-out"
        >
          <Heading as="h3" fontWeight="600" fontSize="1.125rem" mb="1">
            {title}
          </Heading>
          <Text display={{base: 'none', lg: 'block'}}>{description}</Text>
        </Box>
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
