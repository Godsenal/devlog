import React, { Component } from 'react';
import styled from 'styled-components';

import { LogListItem, LogEditor } from '../';

const Container = styled.div`
  flex: 1 1 auto;

  max-width: 800px;
`;
/* Message array for testing */
const messages = Array(100).fill('message');
export default class LogContent extends Component {
  render() {
    return (
      <Container>
        <LogEditor />
        {
          messages.map(((message, i) => (
            <LogListItem key={i} message={`${message}${i}`} />
          )))
        }
      </Container>
    );
  }
}
