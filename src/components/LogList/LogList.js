import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LogListItem, LazyList } from '../';
import LoadingWrapper from '../LoadingWrapper';

class LogList extends Component {
  static propTypes = {
    handleListLog: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
    logs: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }
  handleLazyLoad = () => {
    const { logs } = this.props;
    this.props.handleListLog({ skip: logs.length });
  }
  render() {
    const { logs, status, isLast } = this.props;
    return (
      <div>
        <LazyList
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

export default LoadingWrapper(LogList);
