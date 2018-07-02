import React from 'react';
import PropTypes from 'prop-types';
import { Tag, NoneStyleList } from '../';

export default function TagList({ tags, onTagClick }) {
  return (
    <NoneStyleList>
      {
        tags.map((tag, i) => (
          <Tag key={i} {...tag} onClick={onTagClick(tag)}>{tag.name}</Tag>
        ))
      }
    </NoneStyleList>
  );
}

TagList.propTypes = {
  onTagClick: PropTypes.func,
  tags: PropTypes.array.isRequired,
};
TagList.defaultProps = {
  onTagClick: () => null,
};
