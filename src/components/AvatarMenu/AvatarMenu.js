import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Avatar, Popover } from '../';
import { history } from '../../utils';

const ListItem = styled.div`
  padding: 16px 30px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
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
          <ListItem onClick={this.handleProfile}>
            Profile
          </ListItem>
          <ListItem onClick={this.handleLogout}>Logout</ListItem>
        </Popover>
      </div>
    );
  }
}
