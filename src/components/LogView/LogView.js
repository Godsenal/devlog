import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class LogView extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { match, showModal, history } = this.props;
    const { nickname, logId } = match.params;
    const modalProps = {
      logId,
      onClose: history.action === 'PUSH' ? () => history.goBack() : () => history.push(`/${nickname}`),
    };
    showModal('LOG_MODAL', modalProps);
  }
  componentWillUnmount() {
    this.props.closeModal();
  }
  render() {
    return null;
  }
}
