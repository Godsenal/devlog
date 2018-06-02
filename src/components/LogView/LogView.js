import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../utils';

export default class LogView extends PureComponent {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { location, match, showModal } = this.props;
    if (location.state && location.state.modal) {
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
    return null;
  }
}
