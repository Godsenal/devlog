import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getUser } from '../../actions/user';
import { listLog } from '../../actions/log';
import { Avatar, DimmedLoader, FollowButton, ProfileContent } from '../../components';

const IMAGE_SIZE = 120;
const Container = styled.div`
  max-width: 860px;
  min-height: 800px;

  padding: 0 10px;
  margin: auto;
`;
const Top = styled.div`
  display: flex;

  margin-bottom: 20px;
`;
const FlexLeft = styled.div`
  flex: 0 0;
`;
const FlexRight = styled.div`
  flex: 1 1 auto;

  text-align: right;
`;
const RightItem = styled.div`
  margin-bottom: 10px;
`;
const Follow = styled.div`
  color: rgba(0, 0, 0, 0.6);
`;
class Profile extends Component {
  static propTypes = {
    dispatchGetUser: PropTypes.func.isRequired,
    dispatchListLog: PropTypes.func.isRequired,
    logListState: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    userFollowings: PropTypes.array.isRequired,
    userGetState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { nickname } = this.props.match.params;
    this.props.dispatchGetUser(nickname);
  }
  isFollowing = (followings, followingId) => followings.indexOf(followingId) !== -1;
  render() {
    const { userGetState, userFollowings, logListState, dispatchListLog } = this.props;
    const { status, user } = userGetState;
    if (status !== 'SUCCESS') {
      return <DimmedLoader />;
    }
    const followersCount = user.followers && (
      user.followers.length - !this.isFollowing(userFollowings, user._id)
    );
    return (
      <Container>
        <Top>
          <FlexLeft>
            <Avatar size={IMAGE_SIZE} />
          </FlexLeft>
          <FlexRight>
            <RightItem>
              <h1>{user.nickname}</h1>
            </RightItem>
            <RightItem>
              <Follow>
                <span>{user.followings && user.followings.length} Followings </span>
                <span>{followersCount} Followers </span>
              </Follow>
            </RightItem>
            <RightItem>
              <div>
                <FollowButton followingId={user._id} />
              </div>
            </RightItem>
          </FlexRight>
        </Top>
        <ProfileContent
          {...user}
          logListState={logListState}
          listLog={dispatchListLog}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userFollowings: state.user.login.followings,
  userGetState: state.user.get,
  logListState: state.log.list,
});
const mapDispatchToProps = dispatch => ({
  dispatchListLog: (logItem) => dispatch(listLog({ ...logItem })),
  dispatchGetUser: (userId) => dispatch(getUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
