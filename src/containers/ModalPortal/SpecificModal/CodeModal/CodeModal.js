import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import CodeEditor from './CodeEditor';
import CodeFrame from './CodeFrame';
import codeData from '../../../../data/codeData.json';

const LANGUAGE_OPTIONS = codeData.languages.map((language) => ({ value: language, text: language }));
const Container = styled.div`
  position: relative;

  width: 100%;

  margin: auto;
  margin-top: 10px;
`;
const TabBox = styled.div`
  width: 100%;
  display: flex;

  border-bottom: 1px solid #d4d4d5;
  margin-bottom: 0.5rem;
`;
const Tab = styled.div`
  flex: 1;

  margin-bottom: -1px;
  padding: 1rem 0;

  font-size: 1em;
  text-align: center;

  cursor: pointer;
  
  ${props => (props.active ? `
      border-top: 1px solid #d4d4d5;
      border-left: 1px solid #d4d4d5;
      border-right: 1px solid #d4d4d5;
      border-radius: 5px 5px 0 0;
      background-color: #fff;
    ` : null)}
`;
const ButtonBox = styled.div`
  width: 100%;
  
  padding: 1rem 0;
  
  text-align: center;
`;
const Button = styled.button`
  border: none;
  border-radius: 0.5rem;
  outline: none;

  color: white;
  background-color: ${props => (props.negative ? '#ec3c54' : '#1cbc94')};

  min-height: 1em;
  margin-left: 1rem;
  padding: 0.8rem 3rem;
  
  font-weight: 600;
  font-size: 1rem;

  text-align: right;

  cursor: pointer;

  opacity: 1;
  &:hover {
    opacity: 0.75;
    transition: opacity 0.3s ease;
  }
  ${props => (!props.valid && !props.negative ? `
    opacity: 0.3;
    &:hover {
      opacity: 0.3;
    }
    ` : null
  )}
`;
export default class CodeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeBlockType: props.codeBlockType,
      code: props.code,
      language: props.language || LANGUAGE_OPTIONS[0].value,
      frameType: props.frameType,
      frameSrc: props.frameSrc,
    };
  }
  static propTypes = {
    code: PropTypes.string,
    codeBlockType: PropTypes.string,
    frameSrc: PropTypes.string,
    frameType: PropTypes.string,
    handleClose: PropTypes.func.isRequired,
    handleCodeBlockChange: PropTypes.func.isRequired,
    language: PropTypes.string,
  }
  static defaultProps = {
    code: '',
    codeBlockType: 'editor',
    language: LANGUAGE_OPTIONS[0].value,
    frameSrc: '',
    frameType: '',
  }
  handleModeChange = (codeBlockType = 'editor') => {
    this.setState({
      codeBlockType,
    });
  }
  handleCodeChange = (value) => {
    this.setState({
      code: value,
    });
  }
  handleFrameChange = (frameType = '', frameSrc = '') => {
    this.setState({
      frameType,
      frameSrc,
    });
  }
  // Dynamic import for code language.
  handleLanguageChange = async (_, option) => {
    try {
      await import(`brace/mode/${option.value}`);
      this.setState({
        language: option.value,
      });
    }
    catch (err) {
      // Error Handling
    }
  }
  handleCodeBlockChange = () => {
    const { codeBlockType, code, language, frameSrc, frameType } = this.state;
    const { handleClose, handleCodeBlockChange } = this.props;
    handleCodeBlockChange({
      codeBlockType,
      code,
      language,
      frameSrc,
      frameType,
    });
    handleClose();
  }
  checkValid = (type, code, src) => {
    const validContent = type === 'editor' ? code : src;
    return validContent.length !== 0;
  }
  render() {
    const { code, language, codeBlockType, frameType, frameSrc } = this.state;
    const { handleClose } = this.props;
    const validToSave = this.checkValid(codeBlockType, code, frameSrc);
    return (
      <Container>
        <TabBox>
          <Tab active={codeBlockType === 'editor'} onClick={() => this.handleModeChange('editor')}>Editor</Tab>
          <Tab active={codeBlockType === 'frame'} onClick={() => this.handleModeChange('frame')}>Something</Tab>
        </TabBox>
        {
          codeBlockType === 'editor' ?
            <CodeEditor
              code={code}
              language={language}
              languageOptions={LANGUAGE_OPTIONS}
              handleCodeChange={this.handleCodeChange}
              handleLanguageChange={this.handleLanguageChange}
            /> :
            <CodeFrame frameType={frameType} frameSrc={frameSrc} handleFrameChange={this.handleFrameChange} />
        }
        <ButtonBox>
          <Button onClick={this.handleCodeBlockChange} disabled={!validToSave} valid={validToSave} >Save</Button>
          <Button negative onClick={handleClose}>Close</Button>
        </ButtonBox>
      </Container>
    );
  }
}
