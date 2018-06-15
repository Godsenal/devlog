import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import default_profile from '../../images/default_profile.png';
import { FollowButton } from '../';

const ProfileImage = styled.img`
  width: ${props => (props.big ? '48px' : '36px')};
  height: ${props => (props.big ? '48px' : '36px')};

  border-radius: 50%;
  
  flex: 0 0;
`;
const Content = styled.div`
  margin-left: ${props => (props.isModal ? '' : '50px')};
`;
const Header = styled.div`
  font-size: 14px;

  display: flex;
  align-items: center;

  margin-bottom: 5px;

  span {
    margin-right: 5px;
  }
`;
const AuthorInfo = styled.div`
  margin-left: 15px;
  flex: 1 1 auto;
`;
const Author = styled.div`
  font-weight: 600;
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
  render() {
    const { author_id, author_nickname, created, text, children, isModal } = this.props;
    return (
      <div>
        <Header>
          <ProfileImage src={default_profile} big={isModal} />
          <AuthorInfo>
            <Link to={`/${author_nickname}`}><Author>{author_nickname}</Author></Link>
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
