import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CodeIcon from 'react-icons/lib/fa/code';
import TagIcon from 'react-icons/lib/fa/tags';

import { IconButton } from '../';

const ButtonBox = styled.div`
  position: relative;
  width: 100%;
  margin: 5px auto;

  font-size: 20px;

  display: flex;
  align-items: center;
`;
const LeftBox = styled.div`
  flex: 1 0;

  display: flex;
  align-items: center;
`;
const RightBox = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
`;
const EditorToolBox = ({ onCodeButtonClick, hasCodeBlock, onTagButtonClick, handleLog }) => (
  <ButtonBox>
    <LeftBox>
      <IconButton onClick={onCodeButtonClick} active={hasCodeBlock} >
        <CodeIcon />
      </IconButton>
      <IconButton onClick={onTagButtonClick}>
        <TagIcon />
      </IconButton>
    </LeftBox>
    <RightBox>
      <Button
        mini
        variant="outlined"
        color="primary"
        onClick={handleLog}
      >
        LOG
      </Button>
    </RightBox>
  </ButtonBox>
);

EditorToolBox.propTypes = {
  handleLog: PropTypes.func.isRequired,
  hasCodeBlock: PropTypes.bool.isRequired,
  onCodeButtonClick: PropTypes.func.isRequired,
  onTagButtonClick: PropTypes.func.isRequired,
};

export default EditorToolBox;

