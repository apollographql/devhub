import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';
import React from 'react';
import grid from '../assets/grid.png';
import {Box, Global} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';

export default function Layout({children}) {
  return (
    <>
      <Helmet defaultTitle="DevHub" titleTemplate="%s - DevHub">
        <link rel="icon" href="https://www.apollographql.com/favicon.ico" />
      </Helmet>
      <Global
        styles={{
          body: {
            backgroundImage: `url(${grid})`,
            backgroundPosition: 'top right',
            backgroundRepeat: 'no-repeat'
          }
        }}
      />
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
