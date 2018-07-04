import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { PropsRoute } from '../../routes/RouterUtil';
import { Timeline, LogPage, Profile, Search, TagPage, NotFoundPage } from '../';
import { Header } from '../../components';
/*
  TODO: Fix Modal route
*/
class Home extends Component {
  state = {
    previousLocation: {}, // when location is not modal
    lastLocation: this.props.location,
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
    const { lastLocation } = prevState; // location before update
    // set previousLocation if props.location is not modal
    const update = {
      lastLocation: nextProps.location,
    };
    if (
      nextProps.history.action !== 'POP' &&
      (!lastLocation.state || !lastLocation.state.modal)
    ) {
      update.previousLocation = lastLocation;
    }
    return update;
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
          <Route
            path="/tag"
            component={TagPage}
          />
          <Route
            path="/search/:type?"
            component={Search}
          />
          <PropsRoute
            path="/:nickname"
            component={Profile}
            key={isModal ? previousLocation.key : location.key}
          />
          <Route
            component={NotFoundPage}
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
