module.exports = {
  plugins: [
    'gatsby-plugin-chakra-ui',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-prefetch-google-fonts',
      options: {
        fonts: [
          {
            family: 'Source Sans Pro',
            variants: ['400', '700']
          },
          {
            family: 'Source Code Pro',
            variants: ['400', '700']
          }
        ]
      }
    }
  ]
};
