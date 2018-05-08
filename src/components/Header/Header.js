import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const HEADER_HEIGHT = 80;
const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  position: fixed;

  width: 100%;
  min-height: ${HEADER_HEIGHT}px;
  background-color: white;

  z-index: 100;

`;
const Menubar = styled.div`

  width: 80%;
  
  background-color: white;
  margin: auto;
`;
const Spacer = styled.div`
  position: relative;

  background-color: white;
  min-height: ${HEADER_HEIGHT}px;
`;
class Header extends Component {
  state = { activeItem: 'home' }
  static propTypes = {
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleShowModal = (modalType) => {
    this.props.showModal(modalType);
  }
  handleLogout = () => {
    this.props.logout();
  }
  render() {
    const { activeItem } = this.state;
    const {
      loginState,
    } = this.props;
    return (
      <Fragment>
        <Container>
          <Menubar>
            <Menu secondary>
              <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick} />
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>
                {
                  !loginState.isAuthenticated ?
                    <Fragment>
                      <Menu.Item name="login" onClick={() => this.handleShowModal('LOGIN_MODAL')} />
                      <Menu.Item name="signup" onClick={() => this.handleShowModal('SIGNUP_MODAL')} />
                    </Fragment>
                    :
                    <Fragment>
                      <Menu.Item name={loginState.nickname} />
                      <Menu.Item name="logout" onClick={this.handleLogout} />
                    </Fragment>
                }
              </Menu.Menu>
            </Menu>
          </Menubar>
        </Container>
        <Spacer />
      </Fragment>
    );
  }
}

export default Header;
