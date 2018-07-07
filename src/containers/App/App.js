import React, { Component } from 'react';
import {
  Router,
  Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { history } from '../../utils';
import * as userActions from '../../actions/user';
import * as modalActions from '../../actions/modal';
import { PropsRoute } from '../../routes/RouterUtil';
import { Home, LoginPage, LandingPage } from '../';
import { Header } from '../../components';
import { resize } from '../../actions/environment';

const Container = styled.div`
  background: #fff;
`;
class App extends Component {
  constructor() {
    super();
    window.addEventListener('resize', this.handleResize);
  }
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    loginState: PropTypes.object.isRequired,
    loginStatus: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
    resize: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
    verifyStatus: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.handleResize();
    this.props.verify();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  handleResize = () => {
    this.props.resize();
  }
  render() {
    const {
      isAuthenticated,
      loginState,
      loginStatus,
      logout,
      showModal,
      closeModal,
      verifyStatus,
    } = this.props;
    if (verifyStatus === 'INIT') {
      return (
        <div>
          <Header
            loginState={loginState}
            logout={logout}
            showModal={showModal}
            closeModal={closeModal}
          />
          <LandingPage showModal={showModal} closeModal={closeModal} />
        </div>
      );
    }
    if (verifyStatus === 'WAITING') {
      return null;
    }
    return (
      <Router history={history}>
        <Container>
          <Switch>
            <PropsRoute
              path="/login"
              isAuthenticated={isAuthenticated}
              component={LoginPage}
              loginStatus={loginStatus}
              showModal={showModal}
            />
            <PropsRoute path="/" component={Home} {...this.props} />
          </Switch>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isMobile: state.environment.isMobile,
  isAuthenticated: state.user.login.isAuthenticated,
  loginState: state.user.login,
  loginStatus: state.user.login.status,
  verifyStatus: state.user.verify.status,
});

const mapDispatchToProps = dispatch => ({
  resize: () => dispatch(resize()),
  logout: () => dispatch(userActions.logout()),
  verify: () => dispatch(userActions.verify()),
  showModal: (modalType, modalProps) => dispatch(modalActions.showModal(modalType, modalProps)),
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
