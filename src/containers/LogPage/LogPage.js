import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { LogView } from '../../components';

export default class LogPage extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isModal: PropTypes.bool.isRequired,
    match: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { isModal } = this.props;
    if (isModal) {
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
