import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LogList, Tabs } from '../';
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
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.latestState !== nextProps.latestState) {
      return true;
    }
    if (this.props.starsState !== nextProps.starsState) {
      return true;
    }
    if (this.state.tab !== nextState.tab) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    this.handleListLog(TABS[0])({ skip: 0 });
    if (this.isInit) {
      this.isInit[0] = false;
    }
  }
  isInit = TABS.map(() => true); // condition for tab's initial render
  handleTabChange = (_, tab) => {
    if (this.isInit[tab]) {
      this.isInit[tab] = false;
      this.handleListLog(TABS[tab])({ skip: 0 });
    }
    this.setState({
      tab,
    });
  }
  handleListLog = (type) => ({ skip, limit }) => {
    if (type === 'latest') {
      const { dispatchListLatest, nickname } = this.props;
      dispatchListLatest({ author_nickname: nickname, skip, limit });
    }
    else if (type === 'stars') {
      const { dispatchListStars, _id } = this.props;
      dispatchListStars({ star_user_id: _id, skip, limit });
    }
  }
  render() {
    const { tab } = this.state;
    const { latestState, starsState } = this.props;
    return (
      <div>
        <Tabs
          selected={tab}
          handleTabChange={this.handleTabChange}
        >
          <span>Latest</span>
          <span>Star</span>
        </Tabs>
        { tab === 0 && (
          latestState.logs.length > 0 ?
            <LogList
              {...latestState}
              handleListLog={this.handleListLog('latest')}
            /> : null
        )}
        { tab === 1 && (
          starsState.logs.length > 0 ?
            <LogList
              {...starsState}
              handleListLog={this.handleListLog('stars')}
            /> : null
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
