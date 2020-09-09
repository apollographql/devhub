import {extendTheme} from '@chakra-ui/core';

const body = "'Source Sans Pro', sans-serif";

export default extendTheme({
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
    }
  },
  fonts: {
    body,
    heading: body,
    mono: "'Source Code Pro', monospace"
  },
  colors: {
    gray: {
      50: '#f4f6f8',
      100: '#ebeef0',
      200: '#dee2e7',
      300: '#cad0d8',
      400: '#b2b9c3',
      500: '#777f8e',
      600: '#424855',
      700: '#2f353f',
      800: '#191c23',
      900: '#12151a'
    },
    indigo: {
      50: '#eee7f9',
      100: '#d3c4f0',
      200: '#b69ce8',
      300: '#9873df',
      400: '#8153d8',
      500: '#6834d0',
      600: '#5d2fca',
      700: '#4e26c1',
      800: '#3f20ba',
      900: '#1f11af'
    }
  }
});
