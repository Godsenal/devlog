import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from 'react-icons/lib/fa/close';

import Modal from './Modal';
import { IconButton } from '../../components';
import * as modalActions from '../../actions/modal';


const Container = styled.div`
  display: flex;
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  z-index: 100;

  overflow-y: auto;
  
  background-color: rgba(255,255,255,.65);

  transform: translate3d(0, 0, 0);
  -webkit-overflow-scrolling: touch;
`;
const Header = styled.div`
  position: fixed;
  top: 8px;
  right: 10px;

  font-size: 25px;
`;
const MODAL_ROOT = document.getElementById('modal-root');

class ModalPortal extends Component {
  constructor() {
    super();
    this.portal = document.createElement('div');
  }
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    modalState: PropTypes.shape({
      modalType: PropTypes.string.isRequired,
      modalProps: PropTypes.object.isRequired,
    }).isRequired,
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
  /* Prevent scroll overflow in mobile browser */
  componentDidUpdate(prevProps) {
    if (this.props.isMobile) {
      const { modalType: prevType } = prevProps.modalState;
      const { modalType} = this.props.modalState;
      if (modalType && prevType !== modalType) {
        const node = ReactDOM.findDOMNode(this._modal);
        node.addEventListener('touchmove', this.handleTouch, false);
      }
    }
  }
  handleTouch = (e) => {
    if (this._modal.scrollHeight <= this._modal.clientHeight) {
      e.preventDefault();
    }
  }
  render() {
    const {
      modalState,
      closeModal,
      isMobile,
    } = this.props;
    if (!modalState.modalType) {
      return null;
    }
    return (
      ReactDOM.createPortal(
        <Container innerRef={ref => this._modal = ref}>
          <Header>
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Header>
          <Modal
            modalProps={modalState.modalProps}
            modalType={modalState.modalType}
            handleClose={closeModal}
            isMobile={isMobile}
          />
        </Container>,
        this.portal
      )
    );
  }
}

const mapStateToProps = (state) => ({
  modalState: state.modal,
  isMobile: state.environment.isMobile,
});
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(modalActions.closeModal()),
});
export default connect(mapStateToProps, mapDispatchToProps)(ModalPortal);
