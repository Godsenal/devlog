import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LazyList, LogListItem } from '../';

export default class ProfileContent extends Component {
  state = {
    tab: 0,
  }
  static propTypes = {
    listLog: PropTypes.func.isRequired,
    logListState: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const { listLog, nickname } = this.props;
    listLog({ author_nickname: nickname });
  }
  handleTabChange = (_, tab) => {
    this.setState({
      tab,
    });
  }
  handleLazyLoad = () => {
    const { listLog, logListState } = this.props;
    listLog({
      skip: logListState.logs.length,
      author_nickname: logListState.author_nickname,
    });
  }
  render() {
    const { tab } = this.state;
    const { logListState } = this.props;
    const { logs, isLast, status } = logListState;
    return (
      <div>
        <Paper>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            centered
            onChange={this.handleTabChange}
          >
            <Tab label="List" />
            <Tab label="Followings" />
            <Tab label="Followers" />
          </Tabs>
        </Paper>
        { tab === 0 && (
          <LazyList
            lazyLoad={this.handleLazyLoad}
            isLast={isLast}
            isLoading={status === 'WAITING'}
          >
            { logs.map((log) => <LogListItem key={log._id} {...log} />)}
          </LazyList>
        )}
      </div>
    );
  }
}
