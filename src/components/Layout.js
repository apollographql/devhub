import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';
import React from 'react';
import {Container} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';

export default function Layout({children}) {
  return (
    <>
      <Helmet defaultTitle="DevHub" titleTemplate="%s - DevHub" />
      <Header />
      <Container maxW="xl" pt="8" pb="20" px="16">
        {children}
      </Container>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
