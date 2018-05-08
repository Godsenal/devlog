import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Header, LogContainer } from '../../components';
import * as userActions from '../../actions/user';
import * as modalActions from '../../actions/modal';

/*
  Visible when verfication ended.
*/
const Container = styled.div`
  display: ${props => (props.visible ? 'block' : 'none')};
`;

class Home extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    loginState: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
    verifyStatus: PropTypes.string.isRequired,
  }
  componentDidMount() {
    this.props.verify();
  }
  render() {
    const {
      isMobile,
      loginState,
      logout,
      verifyStatus,
      showModal,
      closeModal,
    } = this.props;
    return (
      <Container visible={verifyStatus !== 'INIT'}>
        <Header
          loginState={loginState}
          logout={logout}
          showModal={showModal}
          closeModal={closeModal}
        />
        {/* Tag List Container */}
        <LogContainer isMobile={isMobile} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isMobile: state.environment.isMobile,
  loginState: state.user.login,
  verifyStatus: state.user.verify.status,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userActions.logout()),
  verify: () => dispatch(userActions.verify()),
  showModal: (modalType, modalProps) => dispatch(modalActions.showModal(modalType, modalProps)),
  closeModal: () => dispatch(modalActions.closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
