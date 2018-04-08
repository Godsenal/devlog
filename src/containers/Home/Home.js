import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from '../../components/Header';
import * as userActions from '../../actions/user';

/*
  Visible when verfication ended.
*/
const Container = styled.div`
  margin: 1rem;
  display: ${props => (props.visible ? 'block' : 'none')};
`;

class Home extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
    verifyStatus: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.props.verify();
  }
  render() {
    const {
      loginState,
      login,
      logout,
      signup,
      verifyStatus,
    } = this.props;
    return (
      <Container visible={verifyStatus !== 'INIT'}>
        <Header
          loginState={loginState}
          login={login}
          logout={logout}
          signup={signup}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loginState: state.user.login,
  verifyStatus: state.user.verify.status,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(userActions.login(username, password)),
  logout: () => dispatch(userActions.logout()),
  signup: (username, password, nickname) => dispatch(userActions.signup(username, password, nickname)),
  verify: () => dispatch(userActions.verify()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
