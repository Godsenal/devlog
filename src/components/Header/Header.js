import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Menu } from 'semantic-ui-react';

class Header extends Component {
  state = { activeItem: 'home' }
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleSignup: PropTypes.func.isRequired,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogin = () => {
    this.props.handleLogin('godsenal', '1234');
  }
  handleSignup = () => {
    this.props.handleSignup('godsenal', '1234', 'godsenal');
  }
  render() {
    const { activeItem } = this.state;
    return (
      <Menu secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          <Menu.Item name="login" active={activeItem === 'login'} onClick={this.handleLogin} />
          <Menu.Item name="signup" active={activeItem === 'signup'} onClick={this.handleSignup} />
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
