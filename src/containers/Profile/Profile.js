import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getUser } from '../../actions/user';
import { mainContainer } from '../../styles/util';
import { Avatar, DimmedLoader, FollowButton, ProfileContent, NotFound } from '../../components';

const IMAGE_SIZE = 120;
const Container = styled.div`
  ${mainContainer()}
  max-width: 860px;
`;
const Top = styled.div`
  display: flex;

  margin-bottom: 20px;
`;
const Message = styled.h2`
  margin-top: 60px;
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
    match: PropTypes.object.isRequired,
    userGetState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { nickname } = this.props.match.params;
    this.props.dispatchGetUser(nickname);
  }
  render() {
    const { userGetState, match } = this.props;
    const { nickname } = match.params;
    const { status, user } = userGetState;
    if (status === 'WAITING') {
      return <DimmedLoader />;
    }
    if (status === 'FAILURE') {
      return <NotFound><Message>Couldn't find anyone with name '{nickname}'</Message></NotFound>;
    }
    return (
      status === 'SUCCESS' &&
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
                  <span>{user.followers && user.followers.length} Followers </span>
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
          />
        </Container>
    );
  }
}

const mapStateToProps = state => ({
  userGetState: state.user.get,
});
const mapDispatchToProps = dispatch => ({
  dispatchGetUser: (userId) => dispatch(getUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
