import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { AvatarMenu, BrowserLink } from '../';
import SearchBar from '../SearchBar';

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

  display: flex;
  align-items: center;
`;
const Title = styled.a`
  color: rgba(0, 0, 0, 0.7);

  font-size: 32px;

  flex: 1 1 auto;

  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;
const RightItem = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
`;
const Spacer = styled.div`
  position: relative;

  background-color: white;
  min-height: ${HEADER_HEIGHT}px;
`;
class Header extends Component {
  static propTypes = {
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  handleShowModal = (modalType) => {
    this.props.showModal(modalType);
  }
  handleLogout = () => {
    this.props.logout();
  }
  render() {
    const {
      loginState,
    } = this.props;
    return (
      <Fragment>
        <Container>
          <Menubar>
            <Title>
              <BrowserLink type="push" location="/">
                <span>DEVLOG</span>
              </BrowserLink>
            </Title>
            <RightItem>
              {
                !loginState.isAuthenticated ?
                  <Fragment>
                    <Button onClick={() => this.handleShowModal('LOGIN_MODAL')}>login</Button>
                    <Button name="signup" onClick={() => this.handleShowModal('SIGNUP_MODAL')}>sign up</Button>
                  </Fragment>
                  :
                  <Fragment>
                    <SearchBar />
                    <AvatarMenu
                      {...loginState}
                      handleLogout={this.handleLogout}
                    />
                  </Fragment>
              }
            </RightItem>
          </Menubar>
        </Container>
        <Spacer />
      </Fragment>
    );
  }
}

export default Header;
