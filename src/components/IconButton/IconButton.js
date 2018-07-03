import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconWrapper = styled.button`
  display: flex;

  font-size: ${props => props.fontSize || '1em'};
  cursor: pointer;

  border: none;
  outline: none;

  background-color: transparent;
  color: rgba(0, 0, 0, 0.5);
  transition: color 0.2s ease-in-out;
  &:hover {
    color: black;
    transition: color 0.2s ease-in-out;
  }
`;

const IconButton = ({ children, ...props }) => (
  <IconWrapper {...props}>
    {children}
  </IconWrapper>
);

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IconButton;

