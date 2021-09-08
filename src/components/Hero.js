import PropTypes from 'prop-types';
import React from 'react';
import commandModule from '../assets/command-module.svg';
import {Box, Center, Flex, Heading, Img, Text} from '@chakra-ui/core';
import {MAX_WIDTH} from '../utils';

export default function Hero({title, description}) {
  return (
    <Flex
      px={{base: '0', lg: '6', xl: '14'}}
      w="full"
      justify="center"
      align="center"
      mb="8"
    >
      <Center
        py={{base: '6', lg: '44px'}}
        px={{base: '12', lg: '40px'}}
        borderRadius={{base: '0', lg: '12px'}}
        bg="linear-gradient(360deg, #0A061E 8.24%, #311C87 100.52%)"
        color="white"
        w="full"
        maxW="1392px"
      >
        <Flex align="center" justify="space-between" w="full" maxW={MAX_WIDTH}>
          <Box>
            <Text fontSize="xs" textTransform="uppercase">
              GraphQL Resources
            </Text>
            <Heading my="2" as="h1" fontSize="2rem">
              {title}
            </Heading>
            <Text w="370px" display="inline-block">
              An Apollo data graph helps you build apps faster with less code.{' '}
              {description}
            </Text>
          </Box>
          <Img
            src={commandModule}
            alt="Space command module"
            display={{base: 'none', lg: 'block'}}
          />
        </Flex>
      </Center>
    </Flex>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
