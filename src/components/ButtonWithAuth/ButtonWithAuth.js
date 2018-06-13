import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal } from '../../actions/modal';
import { history } from '../../utils';

class ButtonWithAuth extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
  }
  static defaultProps = {
    onClick: null,
  }
  handleClick = (e) => {
    e.preventDefault();
    const { isAuthenticated, dispatch, onClick } = this.props;
    if (!isAuthenticated) {
      const prevLocation = history.location;
      dispatch(showModal('LOGIN_MODAL', { onClose: () => history.replace(prevLocation) }));
    }
    else {
      onClick();
    }
  };
  render() {
    const { children } = this.props;
    return (
      React.cloneElement(children, { onClick: this.handleClick })
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.login.isAuthenticated,
});
export default connect(mapStateToProps)(ButtonWithAuth);
