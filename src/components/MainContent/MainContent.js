import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Avatar, FollowButton } from '../';
import { history } from '../../utils';

const Content = styled.div`
  margin-left: ${props => (props.isModal ? '' : '50px')};
`;
const Header = styled.div`
  font-size: 14px;

  display: flex;
  align-items: center;

  margin-bottom: 10px;

  span {
    margin-right: 5px;
  }
`;
const AuthorInfo = styled.div`
  margin-left: 15px;
  flex: 1 1 auto;
`;
const Author = styled.span`
  color: black;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #43baf6;
    text-decoration: underline;
  }
`;
const Date = styled.div`
  color: #ccc;
  font-size: 0.9em;
`;
const Text = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.3em;
  font-size: ${props => (props.isModal ? '20px' : '14px')};
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
  navigateTo = (nickname) => (e) => {
    e.preventDefault();
    history.push({ pathname: `/${nickname}` });
  }
  render() {
    const { author_id, author_nickname, created, text, children, isModal } = this.props;
    return (
      <div>
        <Header>
          <Avatar size={isModal ? 48 : 36} />
          <AuthorInfo>
            <Author onClick={this.navigateTo(author_nickname)}>{author_nickname}</Author>
            <Date>{`${distanceInWordsToNow(created)} ago`}</Date>
          </AuthorInfo>
          { isModal && <FollowButton followingId={author_id} /> }
        </Header>
        <Content isModal={isModal}>
          <Text isModal={isModal}>{text}</Text>
          { children }
        </Content>
      </div>
    );
  }
}
