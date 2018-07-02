import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CloseIcon from 'react-icons/lib/fa/close';
import { LoginModal, SignupModal, CodeModal, LogModal, TagModal } from './SpecificModal';
import { IconButton } from '../../components';
import { media } from '../../styles/util';

const Container = styled.div`
  width: ${props => (props.isMobile ? '90%' : '600px')};
  min-height: 300px;

  margin: auto;

  opacity: ${props => (props.mounted ? '1' : '0')};
  transform: ${props => (props.mounted ? 'scale(1)' : 'scale(0.1)')};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  
  box-shadow: 0 3px 9px rgba(0,0,0,.5);
  background-color: white;

  border-radius: 10px;
`;
const Header = styled.div`
  margin: 5px;
  float: right;
`;
const Body = styled.div`
  margin: 30px;
  ${media.tablet`margin: 10px;`}
`;

const MODAL_COMPONENTS = {
  LOGIN_MODAL: LoginModal,
  SIGNUP_MODAL: SignupModal,
  CODE_MODAL: CodeModal,
  LOG_MODAL: LogModal,
  TAG_MODAL: TagModal,
};
export default class Modal extends Component {
  state = {
    mounted: false,
  }
  static propTypes = {
    handleClose: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    modalProps: PropTypes.object.isRequired,
    modalType: PropTypes.string.isRequired,
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    /* for mount animation */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.setState({
          mounted: true,
        });
      });
    });
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }
  handleClickOutside = (event) => {
    if (this.container && !this.container.contains(event.target)) {
      this.handleClose();
    }
  }
  handleClose = () => {
    const { modalProps, handleClose } = this.props;
    if (modalProps.onClose && typeof modalProps.onClose === 'function') {
      modalProps.onClose();
    }
    handleClose();
  }
  render() {
    const { mounted } = this.state;
    const {
      modalType,
      modalProps,
      isMobile,
    } = this.props;
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return (
      <Container innerRef={ref => { this.container = ref; }} mounted={mounted} isMobile={isMobile}>
        <Header>
          <IconButton onClick={this.handleClose}>
            <CloseIcon />
          </IconButton>
        </Header>
        <Body>
          <SpecificModal {...modalProps} handleClose={this.handleClose} />
        </Body>
      </Container>
    );
  }
}

