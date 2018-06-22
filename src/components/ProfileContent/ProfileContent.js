import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { LazyList, LogListItem } from '../';
import { listLatest, listStars } from '../../actions/profile';

const TABS = ['latest', 'stars'];
class ProfileContent extends Component {
  state = {
    tab: 0,
  }
  static propTypes = {
    _id: PropTypes.string.isRequired,
    dispatchListLatest: PropTypes.func.isRequired,
    dispatchListStars: PropTypes.func.isRequired,
    latestState: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
    starsState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.handleInitialLoad(TABS[0]);
    if (this.isInit) {
      this.isInit[0] = false;
    }
  }
  isInit = TABS.map(() => true); // condition for tab's initial render
  handleTabChange = (_, tab) => {
    if (this.isInit[tab]) {
      this.isInit[tab] = false;
      this.handleInitialLoad(TABS[tab]);
    }
    this.setState({
      tab,
    });
  }
  handleInitialLoad = (type) => {
    if (type === 'latest') {
      const { dispatchListLatest, nickname } = this.props;
      dispatchListLatest({ author_nickname: nickname });
    }
    else if (type === 'stars') {
      const { dispatchListStars, _id } = this.props;
      dispatchListStars({ star_user_id: _id });
    }
  }
  handleLazyLoad = (type) => () => {
    if (type === 'latest') {
      const { dispatchListLatest, latestState, nickname } = this.props;
      dispatchListLatest({
        skip: latestState.logs.length,
        author_nickname: nickname,
      });
    }
    else if (type === 'stars') {
      const { dispatchListStars, starsState, _id } = this.props;
      dispatchListStars({
        skip: starsState.logs.length,
        star_user_id: _id,
      });
    }
  }
  render() {
    const { tab } = this.state;
    const { latestState, starsState } = this.props;
    return (
      <div>
        <Paper>
          <Tabs
            value={tab}
            indicatorColor="primary"
            textColor="primary"
            centered
            fullWidth
            onChange={this.handleTabChange}
          >
            <Tab label="Latest" />
            <Tab label="Stars" />
          </Tabs>
        </Paper>
        { tab === 0 && (
          <LazyList
            lazyLoad={this.handleLazyLoad('latest')}
            isLast={latestState.isLast}
            isLoading={latestState.status === 'WAITING'}
          >
            { latestState.logs.map((log) => <LogListItem key={log._id} {...log} />)}
          </LazyList>
        )}
        { tab === 1 && (
          <LazyList
            lazyLoad={this.handleLazyLoad('stars')}
            isLast={starsState.isLast}
            isLoading={starsState.status === 'WAITING'}
          >
            { starsState.logs.map((log) => <LogListItem key={log._id} {...log} />)}
          </LazyList>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  latestState: state.profile.latest,
  starsState: state.profile.stars,
});

const mapDispatchToProps = dispatch => ({
  dispatchListLatest: (payload) => dispatch(listLatest(payload)),
  dispatchListStars: (payload) => dispatch(listStars(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContent);
