import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
`;
export default class LogComment extends Component {
  static propTypes = {
    comments: PropTypes.array.isRequired,
  }
  render() {
    const { comments } = this.props;
    return (
      <Container>
        { comments.length > 0 ?
          comments.map((comment) => (
            <div key={comment._id}>{comment.text}</div>
          )) : null
        }
      </Container>
    );
  }
}
