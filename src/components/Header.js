import React from 'react';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from '@chakra-ui/core';
import {Link as GatsbyLink} from 'gatsby';
import {IconArrowDown} from '@apollo/space-kit/icons/IconArrowDown';
import {IconMenu} from '@apollo/space-kit/icons/IconMenu';
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
      <Flex mr="auto" align="center">
        <Box as={ApolloIcon} h="6" title="Apollo" />
        <Box
          as="span"
          ml="2"
          mt="-px"
          borderRadius="sm"
          px="1"
          bg="indigo.50"
          color="indigo.600"
          fontSize="sm"
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="widest"
        >
          DevHub
        </Box>
      </Flex>
      <IconButton
        mr={{
          base: 2,
          md: 5
        }}
        variant="ghost"
        borderRadius="full"
        icon={<Box as={IconSearch} h="1em" />}
      />
      <Menu>
        <MenuButton
          as={IconButton}
          display={{base: 'flex', md: 'none'}}
          variant="ghost"
          fontSize="2xl"
          colorScheme="indigo"
          icon={<Box as={IconMenu} h="1em" />}
        />
        <MenuList>
          <MenuItem as={GatsbyLink} to="/">
            DevHub
          </MenuItem>
          <MenuItem as="a" href="https://www.apollographql.com/docs">
            Docs
          </MenuItem>
          <MenuItem as="a" href="https://www.apollographql.com/blog">
            Blog
          </MenuItem>
          <MenuItem as="a" href="https://go.apollo.dev/events-calendar">
            Events
          </MenuItem>
          <MenuItem as="a" href="https://studio.apollographql.com">
            Studio
          </MenuItem>
        </MenuList>
      </Menu>
      <HStack
        display={{
          base: 'none',
          md: 'flex'
        }}
        fontWeight="semibold"
        spacing="8"
      >
        <Link as={GatsbyLink} to="/" color="indigo.600">
          DevHub
        </Link>
        <div>
          <Menu placement="bottom">
            <MenuButton fontWeight="inherit">
              <Flex align="center">
                Docs <Box as={IconArrowDown} h="2" ml="2" />
              </Flex>
            </MenuButton>
            <MenuList fontWeight="normal">
              <MenuItem as="a" href="https://www.apollographql.com/docs/">
                Apollo Basics
              </MenuItem>
              <MenuItem
                as="a"
                href="https://www.apollographql.com/docs/apollo-server/"
              >
                Apollo Server
              </MenuItem>
              <MenuItem
                as="a"
                href="https://www.apollographql.com/docs/studio/"
              >
                Apollo Studio
              </MenuItem>
              <MenuDivider />
              <MenuItem as="a" href="https://www.apollographql.com/docs/react/">
                Apollo Client (React)
              </MenuItem>
              <MenuItem as="a" href="https://www.apollographql.com/docs/ios/">
                Apollo Client (iOS)
              </MenuItem>
              <MenuItem
                as="a"
                href="https://www.apollographql.com/docs/android/"
              >
                Apollo Client (Android)
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <Link href="https://www.apollographql.com/blog/">Blog</Link>
        {/* <Link>Training</Link> */}
        <Link href="https://go.apollo.dev/events-calendar">Events</Link>
        <Button
          as="a"
          href="https://studio.apollographql.com"
          colorScheme="indigo"
        >
          Studio
        </Button>
      </HStack>
    </Flex>
  );
}
