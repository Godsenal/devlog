import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import CodeIcon from 'react-icons/lib/fa/code';

const ButtonBox = styled.div`
  position: relative;
  width: 100%;
  margin: 5px auto;

  font-size: 20px;

  display: flex;
  align-items: center;
`;
const IconButton = styled.button`
  color: white;
  opacity: ${props => (props.active ? 1 : 0.6)};

  padding: 4px;

  background-color: inherit;

  border: none;

  text-align: center;
  outline: none;
  
  &:hover {
    opacity: 1;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
  }
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
const EditorToolBox = ({ onCodeButtonClick, hasCodeBlock, handleLog }) => (
  <ButtonBox>
    <LeftBox>
      <IconButton onClick={onCodeButtonClick} active={hasCodeBlock} >
        <CodeIcon />
      </IconButton>
    </LeftBox>
    <RightBox>
      <Button
        variant="contained"
        mini
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
};

export default EditorToolBox;

