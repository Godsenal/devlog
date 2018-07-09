import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { FollowButton } from '../';

const ProfileImage = styled.img`
  width: 36px;
  height: 36px;

  border-radius: 50%;

  position: absolute;

  float: left;
`;
const Content = styled.div`

`;
const Header = styled.div`
  font-size: 14px;

  display: flex;
  align-items: center;
  height: 36px;

  margin-left: 50px;
  margin-bottom: 15px;
  span {
    margin-right: 5px;
  }
`;
const AuthorInfo = styled.div`
  flex: 1;
`;
const Author = styled.div`
  font-weight: 600;
`;
const Date = styled.div`
  color: #ccc;
`;
const Text = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.3em;

  font-size: 20px;
`;

export default class FullMainContent extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
    children: PropTypes.any,
    created: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }
  static defaultProps = {
    children: null,
  }
  render() {
    const { author, created, text, children } = this.props;
    return (
      <div>
        <ProfileImage src={author.imageUrl || undefined} />
        <Header>
          <AuthorInfo>
            <Author>{author.nickname}</Author>
            <Date>{`${distanceInWordsToNow(created)} ago`}</Date>
          </AuthorInfo>
          <FollowButton followingId={author.id} />
        </Header>
        <Content>
          <Text>{text}</Text>
          { children }
        </Content>
      </div>
    );
  }
}
