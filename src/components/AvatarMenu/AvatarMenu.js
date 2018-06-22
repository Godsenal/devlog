import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, BrowserLink } from '../';

export default class AvatarMenu extends Component {
  state = {
    anchorEl: null,
  }
  static propTypes = {
    handleLogout: PropTypes.func.isRequired,
    nickname: PropTypes.string.isRequired,
  }
  handleAvatarClick = (e) => {
    this.setState({
      anchorEl: e.currentTarget,
    });
  }
  handleAvatarClose = () => {
    this.setState({
      anchorEl: null,
    });
  }
  handleLogout = () => {
    this.props.handleLogout();
    this.handleAvatarClose();
  }
  render() {
    const { anchorEl } = this.state;
    const { nickname } = this.props;
    return (
      <Fragment>
        <ButtonBase
          disableRipple
          aria-owns={anchorEl ? 'profile-menu' : null}
          aria-haspopup="true"
          onClick={this.handleAvatarClick}
        >
          <Avatar />
        </ButtonBase>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleAvatarClose}
        >
          <MenuItem onClick={this.handleAvatarClose}>
            <BrowserLink type="push" location={`${nickname}`}>Profile</BrowserLink>
          </MenuItem>
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </Fragment>
    );
  }
}
