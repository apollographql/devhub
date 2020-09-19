import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';
import React from 'react';
import {Box} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';

export default function Layout({children}) {
  return (
    <>
      <Helmet defaultTitle="DevHub" titleTemplate="%s - DevHub">
        <link rel="icon" href="https://www.apollographql.com/favicon.ico" />
      </Helmet>
      <Header />
      <Box pt="8" pb="20" as="main">
        {children}
      </Box>
      <Footer />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
