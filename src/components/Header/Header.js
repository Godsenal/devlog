import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Menu } from 'semantic-ui-react';

class Header extends Component {
  state = { activeItem: 'home' }
  static propTypes = {
    login: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleLogin = () => {
    this.props.login('godsenal', '1234');
  }
  handleLogout = () => {
    this.props.logout();
  }
  handleSignup = () => {
    this.props.signup('godsenal', '1234', 'godsenal');
  }
  render() {
    const { activeItem } = this.state;
    const {
      loginState,
    } = this.props;
    return (
      <Menu secondary>
        <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
          {
            !loginState.isValid ?
              <Fragment>
                <Menu.Item name="login" onClick={this.handleLogin} />
                <Menu.Item name="signup" onClick={this.handleSignup} />
              </Fragment>
              :
              <Fragment>
                <Menu.Item name={loginState.nickname} onClick={this.handleLogin} />
                <Menu.Item name="logout" onClick={this.handleLogout} />
              </Fragment>
          }
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;
