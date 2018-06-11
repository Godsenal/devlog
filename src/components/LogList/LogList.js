import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LogListItem, LogEditor, LazyList } from '../';

export default class LogList extends Component {
  static propTypes = {
    handleListLog: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
    logs: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }
  handleLazyLoad = () => {
    const { logs } = this.props;
    this.props.handleListLog(logs.length);
  }
  render() {
    const { logs, status, isLast, handleListLog } = this.props;
    return (
      <div>
        <LogEditor />
        <LazyList
          initialLoad={handleListLog}
          lazyLoad={this.handleLazyLoad}
          isLast={isLast}
          isLoading={status === 'WAITING'}
        >
          { logs.map((log) => <LogListItem key={log._id} {...log} />)}
        </LazyList>
      </div>
    );
  }
}
