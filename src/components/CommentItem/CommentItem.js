import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MainContent } from '../';

const Container = styled.div`
  margin-bottom: 10px;
`;
export default class CommentItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_nickname: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Container>
        <MainContent {...this.props} />
      </Container>
    );
  }
}
