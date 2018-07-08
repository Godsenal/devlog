import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LogList, NotFound } from '../';
import { listLatest, listStars } from '../../actions/profile';

class ProfileContent extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    dispatchListLatest: PropTypes.func.isRequired,
    dispatchListStars: PropTypes.func.isRequired,
    latestState: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
    starsState: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.latestState !== nextProps.latestState) {
      return true;
    }
    if (this.props.starsState !== nextProps.starsState) {
      return true;
    }
    if (this.props.type !== nextProps.type) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    const { type } = this.props;
    this._hasLoaded[type] = true;
    this.handleListLog(type)({ skip: 0 });
  }
  componentDidUpdate(prevProps) {
    const { type } = this.props;
    if (prevProps.type !== type) {
      if (!this._hasLoaded[type]) {
        this._hasLoaded[type] = true;
        this.handleListLog(type)({ skip: 0 });
      }
    }
  }
  _hasLoaded = {}; // condition for tab's initial render
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
    const { latestState, starsState, type } = this.props;
    return (
      <div>
        { type === 'latest' && (
          latestState.logs.length > 0 ?
            <LogList
              {...latestState}
              handleListLog={this.handleListLog('latest')}
            /> : starsState.status === 'SUCCESS' && <NotFound>Couldn't find latest log</NotFound>
        )}
        { type === 'stars' && (
          starsState.logs.length > 0 ?
            <LogList
              {...starsState}
              handleListLog={this.handleListLog('stars')}
            /> : starsState.status === 'SUCCESS' && <NotFound>Couldn't find stars log</NotFound>
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
