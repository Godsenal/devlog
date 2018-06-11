import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CommentItem, CommentEditor } from '../';

const Container = styled.div`
  width: 100%;
`;
export default class CommentContainer extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
    handlePostComment: PropTypes.func.isRequired,
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
    const { comments } = this.props;
    return (
      <Container>
        <CommentEditor handlePostComment={this.handleSubmit} />
        { comments.length > 0 ?
          comments.map((comment) => (
            <CommentItem key={comment._id} {...comment} />
          )) : null
        }
      </Container>
    );
  }
}
