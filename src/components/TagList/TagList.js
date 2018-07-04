import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AngleDownIcon from 'react-icons/lib/fa/angle-down';
import { Tag, NoneStyleList, DimmedLoader, IconButton } from '../';
import LoadingWrapper from '../LoadingWrapper';

const Centering = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 15px;
`;
function TagList({ tags, status, isLast, handleListTag }) {
  return (
    <NoneStyleList>
      {
        tags.map((tag, i) => (
          <Tag key={i} {...tag} />
        ))
      }
      {
        !isLast && tags.length > 0 && (
          <Centering>
            <IconButton onClick={() => handleListTag({ skip: tags.length })} fontSize="1.5em">
              <AngleDownIcon />
            </IconButton>
          </Centering>
        )
      }
      { status === 'WAITING' && (
        <div style={{ position: 'relative' }}>
          <DimmedLoader />
        </div>
      )}
    </NoneStyleList>
  );
}

TagList.propTypes = {
  handleListTag: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};

export default LoadingWrapper(TagList);
