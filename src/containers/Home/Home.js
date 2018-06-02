import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute, PrivateRoute } from '../../routes/RouterUtil';
import { history } from '../../utils';
import { Timeline } from '../';
import { Header, LogView } from '../../components';
/*
  Visible when verfication ended.
*/
class Home extends Component {
  state = {
    lastLocation: {},
  }
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isMobile: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const { lastLocation } = prevState;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== 'POP' &&
      (!lastLocation.state || !lastLocation.state.modal)
    ) {
      return null;
    }
    return {
      lastLocation: history.location,
    };
  }
  render() {
    const { lastLocation } = this.state;
    const {
      location,
      isMobile,
      loginState,
      logout,
      showModal,
      closeModal,
      isAuthenticated,
    } = this.props;
    if (location.pathname === '/' && !isAuthenticated) {
      return (
        <div>
          <h1>Welcome!</h1>
          <button onClick={() => this.props.showModal('LOGIN_MODAL')}> login </button>
        </div>
      );
    }
    const isModal = !!(
      location.state &&
      location.state.modal &&
      lastLocation !== location
    );
    return (
      <div>
        <Header
          loginState={loginState}
          logout={logout}
          showModal={showModal}
          closeModal={closeModal}
        />
        <Switch location={isModal ? lastLocation : location}>
          <PropsRoute
            exact path="/"
            component={Timeline}
            isMobile={isMobile}
            showModal={showModal}
            closeModal={closeModal}
          />
          <PrivateRoute
            path="/profile"
            isAuthenticated={isAuthenticated}
            redirectTo="/login"
            component={() => <h1>Profile</h1>}
          />
        </Switch>
        { isModal && <PropsRoute path="/log/:logId" component={LogView} showModal={showModal} closeModal={closeModal} /> }
      </div>
    );
  }
}

export default Home;
