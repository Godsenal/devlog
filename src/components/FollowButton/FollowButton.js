import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { ButtonWithAuth } from '../';
import { follow } from '../../actions/user';

class FollowButton extends Component {
  static propTypes = {
    dispatchFollow: PropTypes.func.isRequired,
    followingId: PropTypes.string.isRequired,
    userState: PropTypes.object.isRequired,
  }
  checkFollowed = () => {
    const { followings } = this.props.userState;
    const { followingId } = this.props;
    return followings.indexOf(followingId) !== -1;
  }
  handleFollow = () => {
    const { followingId, dispatchFollow } = this.props;
    const userId = this.props.userState._id;
    const isFollowed = this.checkFollowed();
    const followData = {
      userId,
      followingId,
      isFollowed,
    };
    dispatchFollow(followData);
  }
  render() {
    const { followingId, userState } = this.props;
    if (followingId === userState._id) {
      return null;
    }
    return (
      <ButtonWithAuth onClick={this.handleFollow}>
        { this.checkFollowed() ?
          <Button variant="contained" color="primary">Unfollow</Button> :
          <Button variant="outlined" color="primary">Follow</Button>
        }
      </ButtonWithAuth>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.user.login,
});
const mapDispatchToProps = dispatch => ({
  dispatchFollow: (followData) => dispatch(follow({ ...followData })),
});
export default connect(mapStateToProps, mapDispatchToProps)(FollowButton);
