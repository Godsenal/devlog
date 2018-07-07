import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listFollower, listFollowing } from '../../actions/profile';
import { UserList, HeaderText } from '../../components';

class FollowPage extends Component {
  static propTypes = {
    dispatchFollower: PropTypes.func.isRequired,
    dispatchFollowing: PropTypes.func.isRequired,
    follower: PropTypes.object.isRequired,
    following: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const { nickname, match } = this.props;
    const { type } = match.params;
    this.handleListFollow(type, nickname)({ skip: 0 });
  }
  componentDidUpdate(prevProps) {
    const { type: prevType } = prevProps.match.params;
    const { type } = this.props.match.params;
    if (prevType !== type || prevProps.nickname !== this.props.nickname) {
      this.handleListFollow(type, this.props.nickname)({ skip: 0 });
    }
  }
  handleListFollow = (type, nickname) => ({ skip, limit }) => {
    switch (type) {
      case 'following': {
        this.props.dispatchFollowing({ nickname, skip, limit });
        break;
      }
      case 'follower': {
        this.props.dispatchFollower({ nickname, skip, limit });
        break;
      }
      default:
        break;
    }
  }
  getCurrentData = (type) => {
    const { nickname } = this.props;
    switch (type) {
      case 'following': {
        const { following } = this.props;
        return {
          ...following,
          users: following.followings,
          handleListUser: this.handleListFollow(type, nickname),
        };
      }
      case 'follower': {
        const { follower } = this.props;
        return {
          ...follower,
          users: follower.followers,
          handleListUser: this.handleListFollow(type, nickname),
        };
      }
      default:
        return null;
    }
  }
  render() {
    const { match, nickname } = this.props;
    const { type } = match.params;
    const data = this.getCurrentData(type);
    if (!data) {
      return null;
    }
    return (
      <div>
        <HeaderText>
          <span style={{ color: 'black' }}>{nickname}</span> {type}s
        </HeaderText>
        <UserList {...data} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  follower: state.profile.follower,
  following: state.profile.following,
});
const mapDispatchToProps = dispatch => ({
  dispatchFollower: (payload) => dispatch(listFollower(payload)),
  dispatchFollowing: (payload) => dispatch(listFollowing(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowPage);
