import merge from 'lodash.merge';
import theme from '@chakra-ui/theme';

const body = "'Source Sans Pro', sans-serif";

export default merge(theme, {
  fonts: {
    body,
    heading: body,
    mono: "'Source Code Pro', monospace"
  }
});
