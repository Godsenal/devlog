import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { defaultTag } from '../../styles/util';
import { history } from '../../utils';

const TagItem = styled.li`
  ${defaultTag}
`;
const Tag = ({ name, children, ...props }) => (
  <TagItem onClick={() => history.push(`/tag?tags=${name}`)} {...props}>
    {name}
    {children}
  </TagItem>
);
Tag.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
};
export default Tag;
