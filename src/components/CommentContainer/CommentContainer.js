import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { CommentItem, CommentEditor, ButtonWithAuth } from '../';

const Container = styled.div`
  width: 100%;
`;
const Header = styled.div`
  float: left;
  margin: 10px 0;
`;
const Title = styled.span`
  font-size: 16px;
  color: rgba(0,0,0,.7);
  font-weight: 600;
`;
export default class CommentContainer extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    handlePostComment: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    userNickname: PropTypes.string.isRequired,
  }
  /*
    author_id: Schema.Types.ObjectId,
    author_nickname: String,
    created: { type: Date, default: Date.now },
    text: String,
    thread_id: Schema.Types.ObjectId,
    parent_id: Schema.Types.ObjectId,
  */
  handleSubmit = (text) => {
    const { userId, userNickname, logId, handlePostComment } = this.props;
    const comment = {
      author_id: userId,
      author_nickname: userNickname,
      text,
      thread_id: logId,
    };
    handlePostComment(comment);
  }
  render() {
    const { comments, isAuthenticated } = this.props;
    return (
      <Container>
        <Header>
          <Title>Comments</Title>
        </Header>
        { isAuthenticated ?
          <CommentEditor handlePostComment={this.handleSubmit} />
          :
          <ButtonWithAuth>
            <Button fullWidth variant="outlined">Login to post a comment!</Button>
          </ButtonWithAuth>
        }
        { comments.length > 0 ?
          comments.map((comment) => (
            <CommentItem key={comment._id} {...comment} />
          )) : null
        }
      </Container>
    );
  }
}
