import PropTypes from 'prop-types';
import React from 'react';
import { Container } from './styled';

export default function Loading({ isLoading }) {
  if (!isLoading) return React.Fragment;

  return (
    <Container>
      <div className="loader" />
    </Container>
  );
}

Loading.defaultProps = {
  isLoading: false,
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
