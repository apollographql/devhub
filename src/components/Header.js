import React from 'react';
import Search from './Search';
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
  MenuList,
  useDisclosure
} from '@chakra-ui/core';
import {Link as GatsbyLink} from 'gatsby';
import {IconArrowDown} from '@apollo/space-kit/icons/IconArrowDown';
import {IconMenu} from '@apollo/space-kit/icons/IconMenu';

export default function Header() {
  const searchProps = useDisclosure();
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
      <Flex
        mr="auto"
        align="center"
        display={{
          base: searchProps.isOpen ? 'none' : 'flex',
          md: 'flex'
        }}
      >
        <Box as={ApolloIcon} h="6" title="Apollo" />
        <Box
          as={GatsbyLink}
          to="/"
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
      <Search {...searchProps} />
      <Menu>
        <MenuButton
          as={IconButton}
          display={{
            base: searchProps.isOpen ? 'none' : 'flex',
            md: 'none'
          }}
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
          md: searchProps.isOpen ? 'none' : 'flex',
          lg: 'flex'
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
