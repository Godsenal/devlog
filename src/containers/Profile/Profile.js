import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PropsRoute } from '../../routes/RouterUtil';
import { getUser } from '../../actions/user';
import { mainContainer, linkText } from '../../styles/util';
import { ProfileSwitch, NotFoundPage } from '../';
import { Avatar, DimmedLoader, FollowButton, NotFound, BrowserLink } from '../../components';

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
const FollowLink = styled.a`
  ${linkText()};
`;
class Profile extends Component {
  static propTypes = {
    dispatchGetUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    userGetState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { nickname } = this.props.match.params;
    const parsed = this.checkNickname(nickname);
    if (parsed) {
      this.props.dispatchGetUser(parsed);
    }
  }
  componentDidUpdate(prevProps) {
    const { nickname: prevNickname } = prevProps.match.params;
    const { nickname } = this.props.match.params;
    const parsed = this.checkNickname(nickname);
    if (parsed && (prevNickname !== nickname)) {
      window.scrollTo(0, 0);
      this.props.dispatchGetUser(parsed);
    }
  }
  checkNickname = (str) => {
    if (!str) {
      return false;
    }
    if (str.charAt(0) !== '@') {
      return false;
    }
    return str.replace('@', '');
  }
  render() {
    const { userGetState, match } = this.props;
    const { nickname } = match.params;
    const { status, user } = userGetState;
    if (!this.checkNickname(nickname)) {
      return <NotFoundPage />;
    }
    if (status === 'WAITING') {
      return <DimmedLoader />;
    }
    if (status === 'FAILURE') {
      return <NotFound><Message>Couldn't find anyone with name '{nickname}'</Message></NotFound>;
    }
    const hasFollowing = user.followings && user.followings.length > 0;
    const hasFollower = user.followers && user.followers.length > 0;
    return (
      status === 'SUCCESS' &&
        <Container>
          <Top>
            <FlexLeft>
              <Avatar size={IMAGE_SIZE} src={user.imageUrl || undefined} />
            </FlexLeft>
            <FlexRight>
              <RightItem>
                <h1>{user.nickname}</h1>
              </RightItem>
              <RightItem>
                <Follow>
                  {
                    hasFollowing && (
                      <FollowLink>
                        <BrowserLink type="push" location={`${match.url}/following`}>
                          {user.followings.length} Followings
                        </BrowserLink>
                      </FollowLink>
                    )
                  }
                  {' '}
                  {
                    hasFollower && (
                      <FollowLink>
                        <BrowserLink type="push" location={`${match.url}/follower`}>
                          {user.followers.length} Followers
                        </BrowserLink>
                      </FollowLink>
                    )
                  }
                </Follow>
              </RightItem>
              <RightItem>
                <div>
                  <FollowButton followingId={user._id} />
                </div>
              </RightItem>
            </FlexRight>
          </Top>
          <PropsRoute
            path={`${match.url}/:type?`}
            component={ProfileSwitch}
            _id={user._id}
            nickname={this.checkNickname(nickname)}
          />
        </Container>
    );
  }
}

const mapStateToProps = state => ({
  userGetState: state.user.get,
});
const mapDispatchToProps = dispatch => ({
  dispatchGetUser: (nickname) => dispatch(getUser(nickname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
