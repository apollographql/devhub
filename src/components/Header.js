import PropTypes from 'prop-types';
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

function NavMenu({children, label, ...props}) {
  return (
    <Menu placement="bottom">
      <MenuButton fontWeight="inherit" {...props}>
        <Flex align="center">
          {label} <Box as={IconArrowDown} h="2" ml="2" />
        </Flex>
      </MenuButton>
      <MenuList fontWeight="normal">{children}</MenuList>
    </Menu>
  );
}

NavMenu.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired
};

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
        as={GatsbyLink}
        to="/"
        display={{
          base: searchProps.isOpen ? 'none' : 'flex',
          md: 'flex'
        }}
      >
        <Box as={ApolloIcon} h="6" title="Apollo" />
        <Box
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
          Developers
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
            Home
          </MenuItem>
          <MenuItem as={GatsbyLink} to="/feed">
            News Feed
          </MenuItem>
          <MenuItem as={GatsbyLink} to="/collections">
            Collections
          </MenuItem>
          <MenuItem as="a" href="https://www.apollographql.com/docs">
            Docs
          </MenuItem>
          <MenuItem as="a" href="https://www.apollographql.com/blog">
            Blog
          </MenuItem>
          <MenuItem as="a" href="https://apollographql.com/events">
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
        <div>
          <NavMenu label="Developers" color="indigo.600">
            <MenuItem as={GatsbyLink} to="/">
              Home
            </MenuItem>
            <MenuItem as={GatsbyLink} to="/feed">
              News Feed
            </MenuItem>
            <MenuItem as={GatsbyLink} to="/collections">
              Collections
            </MenuItem>
          </NavMenu>
        </div>
        <div>
          <NavMenu label="Docs">
            <MenuItem as="a" href="https://www.apollographql.com/docs/">
              Apollo Basics
            </MenuItem>
            <MenuItem
              as="a"
              href="https://www.apollographql.com/docs/apollo-server/"
            >
              Apollo Server
            </MenuItem>
            <MenuItem as="a" href="https://www.apollographql.com/docs/studio/">
              Apollo Studio
            </MenuItem>
            <MenuItem
              as="a"
              href="https://www.apollographql.com/docs/federation/"
            >
              Apollo Federation
            </MenuItem>
            <MenuDivider />
            <MenuItem as="a" href="https://www.apollographql.com/docs/react/">
              Apollo Client (React)
            </MenuItem>
            <MenuItem as="a" href="https://www.apollographql.com/docs/ios/">
              Apollo Client (iOS)
            </MenuItem>
            <MenuItem as="a" href="https://www.apollographql.com/docs/android/">
              Apollo Client (Android)
            </MenuItem>
          </NavMenu>
        </div>
        <Link href="https://www.apollographql.com/blog/">Blog</Link>
        {/* <Link>Training</Link> */}
        <Link href="https://apollographql.com/events">Events</Link>
        <Button
          as="a"
          href="https://studio.apollographql.com"
          colorScheme="indigo"
        >
          Studio
        </Button>
        <span>
          {menuItems.map(item => (
            <Link key={item.text} href={item.href} as={item.href}>
              <a
                className={styles.menuitem}
                onClick={() => this.setState({isMenuOpen: false})}
              >
                {item.text}
              </a>
            </Link>
          ))}
        </span>
      </HStack>
    </Flex>
  );
}
