import React from 'react';
import {ApolloIcon} from '@apollo/space-kit/icons/ApolloIcon';
import {Box, Container, Text} from '@chakra-ui/core';

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" color="white">
      <Container maxW="xl" px="16" py="12">
        <Box mb="4" as={ApolloIcon} h="8" />
        <Text>&copy; {new Date().getFullYear()} Apollo Graph Inc.</Text>
      </Container>
    </Box>
  );
}
