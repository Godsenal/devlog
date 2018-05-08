import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../styles/util';

import { LogList } from '../';

const Background = styled.div`
  width: 100%;
  height: 100%;

  background-color: #F2F2F2;
`;

const Container = styled.div`
  display: flex;
  
  width: 80%;
  ${media.tablet`width: 90%`}
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;

  justify-content: space-between;

  overflow-y: auto;

`;
const Sidebar = styled.div`
  flex: 0 0 auto;

  max-width: 400px;
`;

export default class LogContainer extends Component {
  static propTypes = {
    isMobile: PropTypes.bool.isRequired,
  }
  render() {
    const {
      isMobile,
    } = this.props;
    return (
      <Background>
        <Container>
          <LogList />
          {
            isMobile ?
              null :
              <Sidebar>
                side
              </Sidebar>
          }
        </Container>
      </Background>
    );
  }
}
