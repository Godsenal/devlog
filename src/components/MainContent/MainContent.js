import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import default_profile from '../../images/default_profile.png';
import { FollowButton } from '../';

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;

  border-radius: 50%;

  position: absolute;

  float: left;
`;
const Content = styled.div`
  margin-left: ${props => (props.isModal ? '' : '50px')};
`;
const Header = styled.div`
  font-size: 14px;

  display: flex;
  align-items: center;
  height: 36px;

  margin-left: 50px;
  margin-bottom: ${props => (props.isModal ? '15px' : '')};
  span {
    margin-right: 5px;
  }
`;
const AuthorInfo = styled.div`
  flex: 1;
`;
const Author = styled.span`
  font-weight: 600;
`;
const Date = styled.span`
  color: #ccc;
  &::before {
    content: "\00b7";
  }
`;
const Text = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 20px;

  font-size: ${props => (props.isModal ? '20px' : '16px')};
`;

export default class MainContent extends Component {
  static propTypes = {
    author_id: PropTypes.string.isRequired,
    author_nickname: PropTypes.string.isRequired,
    children: PropTypes.any,
    created: PropTypes.string.isRequired,
    isModal: PropTypes.bool,
    text: PropTypes.string.isRequired,
  }
  static defaultProps = {
    children: null,
    isModal: false,
  }
  render() {
    const { author_id, author_nickname, created, text, isModal, children } = this.props;
    return (
      <div>
        <ProfileImage src={default_profile} />
        <Header isModal={isModal}>
          <AuthorInfo>
            <Author>{author_nickname}</Author>
            <Date>{`${distanceInWordsToNow(created)} ago`}</Date>
          </AuthorInfo>
          { isModal && <FollowButton followingId={author_id} />}
        </Header>
        <Content isModal={isModal}>
          <Text isModal={isModal}>{text}</Text>
          { children }
        </Content>
      </div>
    );
  }
}
