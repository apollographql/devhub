import PropTypes from 'prop-types';
import React from 'react';
import {Box, Flex, Heading, Text} from '@chakra-ui/core';

export default function Hero({title, description}) {
  return (
    <Flex
      px={{base: '0', lg: '6', xl: '14'}}
      w="full"
      justify="center"
      align="center"
      mb="8"
    >
      <Flex
        p="40px 44px"
        borderRadius={{base: '0', lg: '12px'}}
        bg="linear-gradient(360deg, #0A061E 8.24%, #311C87 100.52%)"
        color="white"
        w="full"
        maxW="1392px"
        align="center"
        justify="space-between"
      >
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
        {/* TODO: Add command module illustration */}
      </Flex>
    </Flex>
  );
}

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
