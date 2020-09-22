import PropTypes from 'prop-types';
import React from 'react';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {Box, Link, List, ListItem, Stack, Text} from '@chakra-ui/core';

function FooterMenu({title, children}) {
  return (
    <div>
      <Text mb={{base: 2, md: 4}} fontWeight="semibold">
        {title}
      </Text>
      <List spacing="2">
        {React.Children.map(children, child => (
          <ListItem>{child}</ListItem>
        ))}
      </List>
    </div>
  );
}

FooterMenu.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white">
      <Box
        display={{md: 'flex'}}
        mx="auto"
        maxW="container.xl"
        px={[8, 10, 12, 16]}
        py="12"
      >
        <Box mr="8" mb="8">
          <Box mb="4" as={ApolloIcon} h="8" />
          <Text>&copy; {new Date().getFullYear()} Apollo Graph Inc.</Text>
        </Box>
        <Stack
          direction={{
            base: 'column',
            md: 'row'
          }}
          align="flex-start"
          spacing={[8, 10, 12, 16]}
          ml="auto"
        >
          <FooterMenu title="Company">
            <Link href="https://www.apollographql.com/about-us">About us</Link>
            <Link href="https://www.apollographql.com/careers">Careers</Link>
            <Link href="https://www.apollographql.com/careers#positions">
              Open positions
            </Link>
            <Link href="https://www.apollographql.com/careers/team">Team</Link>
          </FooterMenu>
          <FooterMenu title="Community">
            <Link href="https://summit.graphql.com/">GraphQL Summit</Link>
            <Link href="https://spectrum.chat/apollo">Apollo Spectrum</Link>
            <Link href="https://www.apollographql.com/blog">Blog</Link>
          </FooterMenu>
          <FooterMenu title="Help">
            <Link href="https://www.apollographql.com/contact-sales">
              Contact an Expert
            </Link>
            <Link href="https://www.apollographql.com/support">
              Get Support
            </Link>
            <Link href="https://www.apollographql.com/Apollo-Website-Terms-of-Service.pdf">
              Website Terms of Service
            </Link>
            <Link href="https://www.apollographql.com/Apollo-Terms-of-Service.pdf">
              Product Terms of Service
            </Link>
            <Link href="https://www.apollographql.com/Apollo-Privacy-Policy.pdf">
              Privacy Policy
            </Link>
          </FooterMenu>
        </Stack>
      </Box>
    </Box>
  );
}
