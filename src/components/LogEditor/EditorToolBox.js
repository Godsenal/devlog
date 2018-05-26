import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';


const ButtonBox = styled.div`
  position: relative;
  width: 100%;
  margin: 5px auto;

  font-size: 24px;

  display: flex;
  align-items: center;
`;
const IconButton = styled.button`
  color: white;
  opacity: 0.6;

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
  background: white;
  color: black;

  border: none;
  outline: none;
  border-radius: 100px;

  width: 100px;
  padding: 5px 10px;

  font-size: 0.7em;
`;
const EditorToolBox = ({ onCodeButtonClick }) => (
  <ButtonBox>
    <LeftBox>
      <IconButton onClick={onCodeButtonClick}>
        <Icon name="code" />
      </IconButton>
      <IconButton>
        <Icon name="image" />
      </IconButton>
    </LeftBox>
    <RightBox>{/*TODO: Done Button */}
      <DoneButton>DONE</DoneButton>
    </RightBox>
  </ButtonBox>
);

EditorToolBox.propTypes = {
  onCodeButtonClick: PropTypes.func.isRequired,
};

export default EditorToolBox;

