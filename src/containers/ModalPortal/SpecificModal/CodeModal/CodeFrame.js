import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FiddleIcon from 'react-icons/lib/fa/jsfiddle';
import { CodeFrameBox } from '../../../../components';

const JSFIDDLE_REG = RegExp(/(?:https?:)?\/\/jsfiddle.net\/\w+(\/\w+)?(\/\w+)?\/embedded\/?([,(js|html|css|result)+])*\/?(?:dark)?\/?\??((|&)(?:fontColor|accentcolor|menucolor|bodycolor)=#?\w+){0,4}\/?/, 'i');
// const GIST_REG = RegExp(/(?:https?:)?\/\/gist.github.com\/\w+\/\w+\.\w+?/, 'gi');
const IconBox = styled.div`
  display: flex;
  justify-content: center;

  margin: 1rem auto;
`;
const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 0 1rem;
`;
const InputWrapper = styled.div`
  width: 80%;
  margin: 0.5rem auto;
`;
const Input = styled.input`
  width: 100%;

  font-size: 1.3rem;
  line-height: 1.5;

  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;

  padding: 0.5rem;
`;
const InputError = styled.p`
  color: #d12b30;

  font-size: 1em;

  text-align: center;
`;
export default class CodeFrame extends Component {
  state = {
    value: '',
    showError: false,
  }
  static propTypes = {
    frameSrc: PropTypes.string.isRequired,
    frameType: PropTypes.string.isRequired,
    handleFrameChange: PropTypes.func.isRequired,
  }
  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
      showError: false,
    });
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const { value } = this.state;
      const frameType = this.checkUrl(value);
      if (frameType) {
        this.props.handleFrameChange(frameType, value);
        this.setState({
          value: '',
          showError: false,
        });
        return;
      }
      this.props.handleFrameChange();
      this.setState({
        showError: true,
      });
    }
  }
  checkUrl = (url) => {
    if (JSFIDDLE_REG.test(url)) {
      return 'jsfiddle';
    }
    /*
      For futher url type.
      else if (GIST_REG.test(url)) {
        return 'gist';
      }
    */
  }
  render() {
    const { value, showError } = this.state;
    const { frameSrc, frameType } = this.props;
    return (
      <div>
        <IconBox>
          <IconWrapper>
            <FiddleIcon />
            <span>jsfiddle</span>
          </IconWrapper>
        </IconBox>
        <InputWrapper>
          <Input
            placeholder="Paste a link to embed code and press Enter"
            value={value}
            onChange={this.handleInputChange}
            onKeyPress={this.handleKeyPress}
          />
          { showError && <InputError>Not a valid url.</InputError>}
        </InputWrapper>
        {
          frameSrc && <CodeFrameBox src={frameSrc} type={frameType} height={300} width="100%" />
        }
      </div>
    );
  }
}
