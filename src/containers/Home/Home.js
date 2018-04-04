import React, { Component } from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';

const Container = styled.div`
  margin: 1rem;
`;

class Home extends Component {
  render() {
    return (
      <Container>
        <Header />
      </Container>
    );
  }
}

export default Home;
