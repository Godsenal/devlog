import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, FollowButton, BrowserLink } from '../';
import { defaultPadding, linkText, listItem } from '../../styles/util';

const ListItem = styled.a`
  display: flex;
  align-items: center;

  ${listItem()}
  ${defaultPadding()}
`;
const AvatarText = styled.span`
  margin-left: 10px;  
  ${linkText()}
`;
const FlexLeft = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
`;
const FlexRight = styled.div`
  flex: 0;
`;
export default class UserListItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    avatarSize: PropTypes.number,
    imageUrl: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
  }
  static defaultProps = {
    avatarSize: 60,
  }
  render() {
    const { avatarSize, nickname, imageUrl, _id } = this.props;
    return (
      <ListItem>
        <FlexLeft>
          <Avatar size={avatarSize} src={imageUrl || undefined} alt="profile_image" />
          <AvatarText>
            <BrowserLink location={`/@${nickname}`}>
              {nickname}
            </BrowserLink>
          </AvatarText>
        </FlexLeft>
        <FlexRight>
          <FollowButton followingId={_id} />
        </FlexRight>
      </ListItem>
    );
  }
}
