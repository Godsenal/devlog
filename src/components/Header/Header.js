import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { AvatarMenu, BrowserLink, SearchBar } from '../';
import { linkText } from '../../styles/util';

const HEADER_HEIGHT = 80;
const Container = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  position: fixed;

  width: 100%;
  min-height: ${HEADER_HEIGHT}px;

  z-index: 100;
  border: none;
  background-color: #fff;
  transition: min-height 0.2s ease-in-out;
  ${props => props.isCollapsed && `
    border-bottom: 1px solid #efefef;
    min-height: ${HEADER_HEIGHT - 20}px;
  `}
`;
const Menubar = styled.div`

  width: 80%;
  margin: auto;

  display: flex;
  align-items: center;
`;
const Title = styled.div`
  color: rgba(0, 0, 0, 0.7);

  font-size: 32px;

  flex: 1 1 auto;
`;
const TitleLink = styled.a`
  ${linkText()}
  &:hover {
    color: black;
  }
`;
const RightItem = styled.div`
  flex: 0;
  display: flex;
  align-items: center;
`;
const Spacer = styled.div`
  position: relative;
  min-height: ${HEADER_HEIGHT}px;
`;
class Header extends Component {
  state = {
    headerCollapse: false,
  }
  static propTypes = {
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.checkHeaderCollpase(this.state.headerCollapse);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  checkHeaderCollpase= (currentHeader) => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    if (top >= HEADER_HEIGHT && !currentHeader) {
      this.setState({
        headerCollapse: true,
      });
    }
    else if (top <= HEADER_HEIGHT && currentHeader) {
      this.setState({
        headerCollapse: false,
      });
    }
  }
  handleScroll = () => {
    this.checkHeaderCollpase(this.state.headerCollapse);
  }
  handleShowModal = (modalType) => {
    this.props.showModal(modalType);
  }
  handleLogout = () => {
    this.props.logout();
  }
  render() {
    const {
      headerCollapse,
    } = this.state;
    const {
      loginState,
    } = this.props;
    return (
      <Fragment>
        <Container isCollapsed={headerCollapse}>
          <Menubar>
            <Title>
              <TitleLink>
                <BrowserLink type="push" location="/">
                  <span>DEVLOG</span>
                </BrowserLink>
              </TitleLink>
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
