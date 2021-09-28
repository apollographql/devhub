import PropTypes from 'prop-types';
import React from 'react';
import {Box, Button} from '@chakra-ui/core';
import {Link as GatsbyLink} from 'gatsby';
import {IconBack} from '@apollo/space-kit/icons/IconBack';
import {IconProceed} from '@apollo/space-kit/icons/IconProceed';

const DIRECTION_LEFT = 'left';
const DIRECTION_RIGHT = 'right';

export function BackButton(props) {
  return <ArrowLink direction={DIRECTION_LEFT} ml="-22px" mb="4" {...props} />;
}

BackButton.defaultProps = {
  to: '/',
  children: 'Home'
};

export default function ArrowLink({direction, ...props}) {
  const iconProps = {
    [direction + 'Icon']: (
      <Box
        as={direction === DIRECTION_RIGHT ? IconProceed : IconBack}
        h="1em"
        fontSize={{base: 'xs', md: 'sm'}}
      />
    )
  };
  return (
    <Button
      fontWeight="semibold"
      colorScheme="indigo"
      variant="link"
      as={GatsbyLink}
      {...iconProps}
      {...props}
    />
  );
}

ArrowLink.propTypes = {
  direction: PropTypes.oneOf([DIRECTION_LEFT, DIRECTION_RIGHT]).isRequired
};
