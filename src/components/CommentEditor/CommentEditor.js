import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;
const Comment = styled.textarea`
  width: 100%;
  height: 100px;
  outline: none;
  border: 1px solid rgba(0,0,0,.1);
  border-radius: 10px;

  padding: 10px;
  font-size: 16px;

  resize: none;
`;
const FloatingButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;

  padding: 5px 10px;
  border: none;
  outline: none;

  background-color: #2196f3;
  color: white;

  cursor: pointer;
`;
export default class CommentEditor extends PureComponent {
  state = {
    text: '',
  }
  static propTypes = {
    handlePostComment: PropTypes.func.isRequired,
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
    });
  }
  handlePost = () => {
    const { text } = this.state;
    // some validation
    this.props.handlePostComment(text);
  }
  render() {
    const { text } = this.state;
    return (
      <Container>
        <Comment value={text} onChange={this.handleChange} />
        <FloatingButton onClick={this.handlePost}>
          log
        </FloatingButton>
      </Container>
    );
  }
}
