import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as toastActions from '../../actions/toast';
import Toaster from './Toaster';


const MODAL_ROOT = document.getElementById('modal-root');

class ToastPortal extends Component {
  constructor() {
    super();
    this.portal = document.createElement('div');
  }
  static propTypes = {
    deleteToast: PropTypes.func.isRequired,
    toasts: PropTypes.array.isRequired,
  }
  componentDidMount() {
    // The portal element is inserted in the DOM tree after
    // the Modal's children are mounted, meaning that children
    // will be mounted on a detached DOM node. If a child
    // component requires to be attached to the DOM tree
    // immediately when mounted, for example to measure a
    // DOM node, or uses 'autoFocus' in a descendant, add
    // state to Modal and only render the children when Modal
    // is inserted in the DOM tree.
    MODAL_ROOT.appendChild(this.portal);
  }

  componentWillUnmount() {
    MODAL_ROOT.removeChild(this.portal);
  }
  render() {
    const {
      toasts,
      deleteToast,
    } = this.props;
    return (
      ReactDOM.createPortal(
        <Toaster
          toasts={toasts}
          deleteToast={deleteToast}
        />,
        this.portal
      )
    );
  }
}

const mapStateToProps = (state) => ({
  toasts: state.toast.toasts,
});
const mapDispatchToProps = (dispatch) => ({
  deleteToast: (id) => dispatch(toastActions.deleteToast(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ToastPortal);
