import {colors} from '@apollo/space-kit/colors';
import {extendTheme} from '@chakra-ui/core';
import {mix} from 'polished';

const body = "'Source Sans Pro', sans-serif";
const {grey, silver, black, indigo, blilet} = colors;

export default extendTheme({
  breakpoints: {
    base: '0px',
    xs: '325px',
    sm: '375px',
    md: '768px',
    lg: '1024px',
    xl: '1440px',
    '2xl': '1536px'
  },
  components: {
    Button: {
      sizes: {
        md: {
          h: '36px',
          minW: '36px'
        }
      }
    },
    Heading: {
      baseStyle: {
        fontWeight: 'semibold'
      }
    }
  },
  textStyles: {
    subheading: {
      fontFamily: 'mono',
      textTransform: 'uppercase'
    },
    clamped: {
      display: '-webkit-box',
      overflow: 'hidden',
      WebkitBoxOrient: 'vertical'
    }
  },
  fonts: {
    body,
    heading: body,
    mono: "'Source Code Pro', monospace"
  },
  colors: {
    gray: {
      50: silver.light,
      100: silver.base,
      200: silver.dark,
      300: silver.darker,
      400: grey.lighter,
      500: grey.base,
      600: grey.darker,
      700: black.lighter,
      800: black.base,
      900: black.darker
    },
    indigo: {
      50: indigo.lightest,
      100: indigo.lighter,
      200: indigo.light,
      300: mix(0.5, indigo.light, indigo.base),
      400: indigo.base,
      500: mix(0.5, indigo.base, indigo.dark),
      600: indigo.dark, // primary color
      700: mix(0.5, indigo.dark, indigo.darker),
      800: indigo.darker,
      900: indigo.darkest
    },
    blilet: {
      50: blilet.lightest,
      100: blilet.lighter,
      200: blilet.light,
      300: mix(0.5, blilet.light, blilet.base),
      400: blilet.base,
      500: mix(0.5, blilet.base, blilet.dark),
      600: blilet.dark,
      700: mix(0.5, blilet.dark, blilet.darker),
      800: blilet.darker,
      900: blilet.darkest
    }
  }
});
