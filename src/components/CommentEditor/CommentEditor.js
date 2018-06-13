import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

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
const FloatingButton = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
const Error = styled.div`
  text-align: center;
  color: #f9360e;
`;
export default class CommentEditor extends PureComponent {
  state = {
    text: '',
    error: '',
  }
  static propTypes = {
    handlePostComment: PropTypes.func.isRequired,
  }
  showError = (error) => {
    this.setState({
      error,
    });
  }
  setInit = () => {
    this.setState({
      text: '',
      error: '',
    });
  }
  handleChange = (e) => {
    this.setState({
      text: e.target.value,
      error: '',
    });
  }
  handlePost = () => {
    const { text } = this.state;
    if (text && text.length > 5) {
      this.props.handlePostComment(text);
      this.setInit();
    }
    else {
      this.showError('Comments must be at least 5 characters long');
    }
  }
  render() {
    const { text, error } = this.state;
    return (
      <div>
        <Container>
          <Comment value={text} onChange={this.handleChange} />
          <FloatingButton>
            <Button variant="outlined" mini color="primary" onClick={this.handlePost}>
              LOG
            </Button>
          </FloatingButton>
        </Container>
        { error && <Error>{error}</Error> }
      </div>
    );
  }
}
