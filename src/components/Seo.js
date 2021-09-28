import PropTypes from 'prop-types';
import React from 'react';
import getShareImage from '@jlengstorf/get-share-image';
import {Helmet} from 'react-helmet';
import {useTheme} from '@chakra-ui/core';

export default function Seo({showTitle = true, title, description}) {
  const {colors} = useTheme();

  const titleFont = 'Source%20Sans%20Pro';
  const shareImage = getShareImage({
    title,
    tagline: description,
    cloudName: 'apollographql',
    imagePublicID: 'devhubtemplate_e4uyuk',
    titleExtraConfig: '_bold',
    titleFont,
    titleFontSize: 80,
    taglineFont: titleFont,
    textAreaWidth: 960,
    textLeftOffset: 80,
    textColor: colors.gray[800].slice(1)
  });

  return (
    <Helmet
      title={showTitle ? title : undefined}
      htmlAttributes={{
        lang: 'en'
      }}
    >
      {/* google */}
      <meta name="description" content={description} />
      <meta name="image" content={shareImage} />
      {/* facebook */}
      <meta type="og:title" content={title} />
      <meta type="og:description" content={description} />
      <meta type="og:image" content={shareImage} />
      {/* twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
    </Helmet>
  );
}

Seo.propTypes = {
  showTitle: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
