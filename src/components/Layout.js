import Footer from './Footer';
import Header from './Header';
import PropTypes from 'prop-types';
import React from 'react';
import grid from '../assets/grid.png';
import {Box} from '@chakra-ui/core';
import {Helmet} from 'react-helmet';

export default function Layout({children}) {
  return (
    <Box
      backgroundImage={`url(${grid})`}
      backgroundPosition={{
        base: 'right -360px top',
        lg: 'right -180px top',
        xl: 'right top'
      }}
      backgroundRepeat="no-repeat"
    >
      <Helmet
        defaultTitle="Apollo Developer Hub"
        titleTemplate="%s - Apollo Developer Hub"
      >
        <link rel="icon" href="https://www.apollographql.com/favicon.ico" />
      </Helmet>
      <Header />
      <Box pt="8" pb="20" as="main">
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
