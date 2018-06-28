import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Textarea } from '../';

const Container = styled.div`
  position: relative;
`;
const AlignRight = styled.div`
  text-align: right;
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
    if (text && text.trim().length > 5) {
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
          <Textarea value={text} onChange={this.handleChange} placeholder="What do you think of this log?" />
        </Container>
        {
          text && text.trim().length > 0 && (
            <AlignRight>
              <Button variant="outlined" size="small" color="primary" onClick={this.handlePost}>
                LOG
              </Button>
            </AlignRight>
          )
        }
        { error && <Error>{error}</Error> }
      </div>
    );
  }
}
