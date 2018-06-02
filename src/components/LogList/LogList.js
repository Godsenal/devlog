import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import throttle from 'lodash/throttle';
import { LogListItem, LogEditor } from '../';

const Loading = styled.div`
  width: 100%;

  text-align: center;
`;
const DEFAULT_OFFSET = 50;
export default class LogList extends Component {
  static propTypes = {
    handleListLog: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
    logs: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.props.handleListLog();
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (this.props.isLast) {
      return;
    }
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
    const { logs, status } = this.props;
    return (
      <div>
        <LogEditor />
        {
          logs.map(((log) => (
            <LogListItem key={log._id} {...log} />
          )))
        }
        { status === 'WAITING' && (
          <Loading>
            Loading...
          </Loading>
        )}
      </div>
    );
  }
}
