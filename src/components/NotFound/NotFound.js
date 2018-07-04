import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { emptyContainer } from '../../styles/util';

const Container = styled.div`
  ${emptyContainer()}
`;
const Header = styled.h1`
  font-size: 2em;
`;
export default function NotFound({ children }) {
  return (
    <Container>
      <Header>NOT FOUND</Header>
      {children}
    </Container>
  );
}

NotFound.propTypes = {
  children: PropTypes.node,
};
