import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Component for scrolling to top when location has been changed.
// Exception: current route is Modal.
class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isModal: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isModal && !this.props.isModal && this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);

