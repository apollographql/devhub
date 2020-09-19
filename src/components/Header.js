import React from 'react';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {Box, Button, Flex, HStack, IconButton, Link} from '@chakra-ui/core';
import {IconArrowDown} from '@apollo/space-kit/icons/IconArrowDown';
import {IconSearch} from '@apollo/space-kit/icons/IconSearch';

export default function Header() {
  return (
    <Flex
      as="header"
      align="center"
      px="6"
      h="16"
      position="sticky"
      top="0"
      bg="white"
      zIndex="1"
    >
      <Box as={ApolloIcon} h="8" mr="auto" color="indigo.600" />
      <IconButton
        mr="5"
        variant="ghost"
        borderRadius="full"
        color="gray.300"
        icon={<Box as={IconSearch} h="1em" />}
      />
      <HStack fontWeight="semibold" spacing="8">
        <Link color="indigo.600">DevHub</Link>
        <Link display="flex" alignItems="center">
          Docs <Box as={IconArrowDown} h="2" ml="2" />
        </Link>
        <Link>Blog</Link>
        <Link>Training</Link>
        <Link>Events</Link>
        <Button colorScheme="indigo">Studio</Button>
      </HStack>
    </Flex>
  );
}
