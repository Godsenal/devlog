import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import differenceInYears from 'date-fns/difference_in_years';
import differenceInHours from 'date-fns/difference_in_hours';
import format from 'date-fns/format';
import { Avatar, FollowButton } from '../';
import { linkText } from '../../styles/util';
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

  height: ${props => `${props.height}px;`}
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Author = styled.div`
  color: black;
  font-weight: 600;
`;
const Nickname = styled.span`
  font-size: ${props => (props.isModal ? '18px' : '14px')};
  ${linkText()}
  &:hover {
    color: #1DA1F2;
    text-decoration: underline;
  }

`
const Created = styled.div`
  color: #657786;
  font-size: 0.9em;
`;
const Text = styled.p`
  line-height: 1.3em;
  font-size: ${props => (props.isModal ? '25px' : '14px')};
`;

export default class MainContent extends Component {
  static propTypes = {
    author: PropTypes.object.isRequired,
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
    history.push({ pathname: `/@${nickname}` });
  }
  parseDate = (date) => {
    if (differenceInHours(new Date(), date) < 24) {
      return `${distanceInWordsToNow(date)} ago`;
    }
    if (differenceInYears(new Date(), date) < 1) {
      return format(date, 'MMM DD');
    }
    return format(date, 'YYYY MMM DD');
  }
  render() {
    const { author, created, text, children, isModal } = this.props;
    return (
      <div>
        <Header>
          <Avatar size={isModal ? 48 : 36} src={author.imageUrl || undefined} />
          <AuthorInfo height={isModal ? 48 : 36}>
            <Author>
              <Nickname isModal={isModal} onClick={this.navigateTo(author.nickname)}>{author.nickname}</Nickname>
            </Author>
            <Created>{this.parseDate(created)}</Created>
          </AuthorInfo>
          { isModal && <FollowButton followingId={author._id} /> }
        </Header>
        <Content isModal={isModal}>
          <Text isModal={isModal}>{text}</Text>
          { children }
        </Content>
      </div>
    );
  }
}
