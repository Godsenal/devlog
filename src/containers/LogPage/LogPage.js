import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LogView } from '../../components';

class LogPage extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isModal: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    modalType: PropTypes.string.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { match, showModal, history } = this.props;
    const { logId } = match.params;
    const modalProps = {
      logId,
      onClose: () => history.goBack(),
    };
    showModal('LOG_MODAL', modalProps);
  }
  // when user redirect from 'LOGIN_MODAL'
  componentDidUpdate(prevProps) {
    const { isModal } = this.props;
    if (isModal && prevProps.modalType !== 'LOG_MODAL' && prevProps.modalType !== this.props.modalType) {
      const { match, showModal, history } = this.props;
      const { logId } = match.params;
      const modalProps = {
        logId,
        onClose: () => history.goBack(),
      };
      showModal('LOG_MODAL', modalProps);
    }
  }
  componentWillUnmount() {
    this.props.closeModal();
  }
  render() {
    const { isModal, match } = this.props;
    if (isModal) {
      return null;
    }
    return (
      <LogView logId={match.params.logId} />
    );
  }
}

const mapStateToProps = state => ({
  modalType: state.modal.modalType,
});

export default connect(mapStateToProps)(LogPage);
