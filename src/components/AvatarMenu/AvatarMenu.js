import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfileIcon from 'react-icons/lib/md/account-circle';
import BookmarkIcon from 'react-icons/lib/md/book';
import LogoutIcon from 'react-icons/lib/md/exit-to-app';
import { Avatar, Popover } from '../';
import { history } from '../../utils';
import { linkText } from '../../styles/util';

const ListItem = styled.div`
  padding: 16px 15px;  
`;
const Link = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${linkText()}
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    color: rgba(0, 0, 0, 0.84);
  }
`;
const Divider = styled.div`
  border-top: solid 1px rgba(0,0,0,.05);
  margin-top: 10px;
  margin-bottom: 10px;
  padding-bottom: 0;
  padding-top: 0;
`;
const Pointer = styled.span`
  cursor: pointer;
`;
export default class AvatarMenu extends Component {
  state = {
    anchorEl: null,
  }
  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
    nickname: PropTypes.string.isRequired,
  }
  setContainerRef = (ref) => {
    this._container = ref;
  }
  handleOpen = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  }
  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  }
  handleLogout = () => {
    this.props.handleLogout();
    this.handleClose();
  }
  handleBookmark = () => {
    history.push(`/${this.props.nickname}/bookmark`);
    this.handleClose();
  }
  handleProfile = () => {
    history.push(`/${this.props.nickname}`);
    this.handleClose();
  }
  render() {
    const { anchorEl } = this.state;
    return (
      <div ref={this.setContainerRef}>
        <Pointer><Avatar onClick={this.handleOpen} /></Pointer>
        <Popover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          handleClose={this.handleClose}
        >
          <ListItem>
            <Link onClick={this.handleProfile}>
              <ProfileIcon /> My Profile
            </Link>
          </ListItem>
          <ListItem>
            <Link onClick={this.handleBookmark}>
              <BookmarkIcon /> My Bookmark
            </Link>
          </ListItem>
          <Divider />
          <ListItem >
            <Link onClick={this.handleLogout}>
              <LogoutIcon /> Logout
            </Link>
          </ListItem>
        </Popover>
      </div>
    );
  }
}
