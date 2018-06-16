import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getUser } from '../../actions/user';
import { Avatar, DimmedLoader } from '../../components';
import { media } from '../../styles/util';

const IMAGE_SIZE = 120;
const Container = styled.div`
  max-width: 860px;
  min-height: 800px;

  padding: 0 10px;
  margin: auto;
`;
const Top = styled.div`
  display: flex;
`;
const FlexLeft = styled.div`
  flex: 0 0;
`;
const FlexRight = styled.div`
  flex: 1 1 auto;

  text-align: right;
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
    const { userGetState } = this.props;
    const { status, user } = userGetState;
    if (status !== 'SUCCESS') {
      return <DimmedLoader />;
    }
    return (
      <Container>
        <Top>
          <FlexLeft>
            <Avatar size={IMAGE_SIZE} />
          </FlexLeft>
          <FlexRight>
            <h1>{user.nickname}</h1>
            <Follow>
              <span>{user.followings && user.followings.length} Followings </span>
              <span>{user.followers && user.followers.length} Followers </span>
            </Follow>
          </FlexRight>
        </Top>
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
