import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CodeBox } from '../';

const CodeBlock = styled.div`
  position: relative;

  width: 100%;

  text-align: right;
`;
const FloatingBox = styled.div`
  background: transparent;

  position: absolute;
  top: 5px;
  right: 5px;

  z-index: 2;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.div`
  background-color: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-left: 10px;
  padding: 2px 10px;

  border-radius: 10px;

  background-color: rgba(0,0,0,0.3);
  color: white;

  cursor: pointer;
`;

const Xmark = styled.span`
  font-family: 'Arial', sans-serif;
  font-size: 0.8em;
`;
class EditorCodeBlock extends Component {
  render() {
    const { codeBlockType, code, language, frameSrc, frameType, deleteCodeBlock, editCodeBlock } = this.props;
    return (
      <CodeBlock onClick={editCodeBlock}>
        <CodeBox
          codeBlockType={codeBlockType}
          code={code}
          language={language}
          frameSrc={frameSrc}
          frameType={frameType}
        />
        <FloatingBox>
          <Button onClick={editCodeBlock}>
            <Xmark>Edit</Xmark>
          </Button>
          <Button onClick={deleteCodeBlock}>
            <Xmark>X</Xmark>
          </Button>
        </FloatingBox>
      </CodeBlock>
    );
  }
}

EditorCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  codeBlockType: PropTypes.string.isRequired,
  deleteCodeBlock: PropTypes.func.isRequired,
  editCodeBlock: PropTypes.func.isRequired,
  frameSrc: PropTypes.string.isRequired,
  frameType: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default EditorCodeBlock;

