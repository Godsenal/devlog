import React, { Component } from 'react';
import styled from 'styled-components';
import { MainContent } from '../';

const Container = styled.div`
  margin: 20px 0;
`;
export default class CommentItem extends Component {
  render() {
    return (
      <Container>
        <MainContent {...this.props} />
      </Container>
    );
  }
}
