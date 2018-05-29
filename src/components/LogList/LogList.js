import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { LogListItem, LogEditor } from '../';

const Container = styled.div`
  flex: 1 1 auto;

  width: 90%;
  max-width: 800px;

  margin: 10px auto;
`;
export default class LogList extends Component {
  static propTypes = {
    logs: PropTypes.array.isRequired,
  }
  render() {
    const { logs } = this.props;
    return (
      <Container>
        <LogEditor />
        {
          logs.map(((log) => (
            <LogListItem key={log._id} message={log.text} />
          )))
        }
      </Container>
    );
  }
}
