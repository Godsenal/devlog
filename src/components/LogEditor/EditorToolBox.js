import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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
const DoneButton = styled.button`
  background-color: white;
  border: none;

  outline: none;
  border-radius: 10px;
 
  padding: 6px 16px;

  font-size: 16px;

  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    transition: transform 0.1s ease-in-out;
  }
`;
const EditorToolBox = ({ onCodeButtonClick, hasCodeBlock, handleLog }) => (
  <ButtonBox>
    <LeftBox>
      <IconButton onClick={onCodeButtonClick} active={hasCodeBlock} >
        <CodeIcon />
      </IconButton>
    </LeftBox>
    <RightBox>
      <DoneButton onClick={handleLog} >LOG</DoneButton>
    </RightBox>
  </ButtonBox>
);

EditorToolBox.propTypes = {
  handleLog: PropTypes.func.isRequired,
  hasCodeBlock: PropTypes.bool.isRequired,
  onCodeButtonClick: PropTypes.func.isRequired,
};

export default EditorToolBox;

