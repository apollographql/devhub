import React from 'react';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Link,
  Text
} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';
import {IconArrowDown} from '@apollo/space-kit/icons/IconArrowDown';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';

export default function Index() {
  return (
    <>
      <Helmet title="DevHub" />
      <Flex as="header" align="center" px="6" h="16">
        <Box as={ApolloIcon} h="8" mr="auto" color="indigo.800" />
        <IconButton
          mr="5"
          variant="ghost"
          borderRadius="full"
          color="gray.300"
          icon={<Box as={IconSearch} h="1em" />}
        />
        <HStack fontWeight="semibold" spacing="8">
          <Link color="indigo.800">DevHub</Link>
          <Link display="flex" alignItems="center">
            Docs <Box as={IconArrowDown} h="2" ml="2" />
          </Link>
          <Link>Blog</Link>
          <Link>Training</Link>
          <Link>Events</Link>
          <Button colorScheme="indigo">Studio</Button>
        </HStack>
      </Flex>
      <Box pt="8" px="16">
        <Box maxW="container.sm">
          <Heading mb="1" as="h1" fontSize="6xl" fontWeight="semibold">
            Welcome to DevHub
          </Heading>
          <Text fontSize="lg">
            Apollo is a platform for building a data graph, a communication
            layer that seamlessly connects your application clients to your
            back-end services.
          </Text>
        </Box>
      </Box>
    </>
  );
}
