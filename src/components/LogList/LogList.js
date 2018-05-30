import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import { LogListItem, LogEditor } from '../';

const Container = styled.div`
  flex: 1 1 auto;

  width: 90%;
  max-width: 800px;

  margin: 10px auto;
`;
const DEFAULT_OFFSET = 50;
export default class LogList extends Component {
  static propTypes = {
    handleListLog: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired,
  }
  componentDidMount() {
    this.props.handleListLog();
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    const { documentElement } = document;
    const { scrollTop, clientHeight, scrollHeight } = documentElement;
    if (scrollTop + clientHeight + DEFAULT_OFFSET >= scrollHeight) {
      this.handleListLog(this.props.logs.length);
    }
  }
  handleListLog = throttle((skip) => {
    this.props.handleListLog(skip);
  }, 3000);
  render() {
    const { logs } = this.props;
    return (
      <Container>
        <LogEditor />
        {
          logs.map(((log) => (
            <LogListItem key={log._id} {...log} />
          )))
        }
      </Container>
    );
  }
}
