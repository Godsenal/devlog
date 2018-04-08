import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Header from '../../components/Header';
import { login, signup } from '../../actions/user';

const Container = styled.div`
  margin: 1rem;
`;

class Home extends Component {
  static propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleSignup: PropTypes.func.isRequired,
  }
  render() {
    return (
      <Container>
        <Header handleLogin={this.props.handleLogin} handleSignup={this.props.handleSignup} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  login: state.user.login,
});

const mapDispatchToProps = dispatch => ({
  handleLogin: (username, password) => dispatch(login(username, password)),
  handleSignup: (username, password, nickname) => dispatch(signup(username, password, nickname)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
