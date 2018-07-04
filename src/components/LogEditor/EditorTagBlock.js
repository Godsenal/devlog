import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NoneStyleList, Tag } from '../';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function EditorTagBlock({ tags, showTagModal }) {
  return (
    <Container>
      <NoneStyleList>
        {
          tags.map((tag, i) => <Tag key={i} onClick={showTagModal} name={tag} />)
        }
      </NoneStyleList>
    </Container>
  );
}

EditorTagBlock.propTypes = {
  showTagModal: PropTypes.func.isRequired,
  tags: PropTypes.array.isRequired,
};

