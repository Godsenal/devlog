import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'react-router-dom';
import { PropsRoute } from '../../routes/RouterUtil';
import { Timeline, LogPage, Profile } from '../';
import { Header } from '../../components';
/*
  TODO: Fix Modal route
*/
class Home extends Component {
  state = {
    previousLocation: {}, // when location is not modal
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
      return {
        previousLocation: lastLocation,
      };
    }
    return {
      lastLocation: nextProps.location,
    };
  }
  render() {
    const { previousLocation } = this.state;
    const {
      location,
      isMobile,
      loginState,
      logout,
      showModal,
      closeModal,
    } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      previousLocation !== location
    );
    console.log(previousLocation);
    return (
      <div>
        <Header
          loginState={loginState}
          logout={logout}
          showModal={showModal}
          closeModal={closeModal}
        />
        <Switch location={isModal ? previousLocation : location}>
          <PropsRoute
            exact path="/"
            component={Timeline}
            isMobile={isMobile}
            showModal={showModal}
            closeModal={closeModal}
          />
          <PropsRoute
            path="/:nickname"
            component={Profile}
          />
        </Switch>
        <PropsRoute
          path="/:nickname/log/:logId"
          component={LogPage}
          isModal={isModal}
          showModal={showModal}
          closeModal={closeModal}
        />
      </div>
    );
  }
}

export default Home;
