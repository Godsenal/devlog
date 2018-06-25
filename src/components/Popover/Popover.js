import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../styles/util';

const Container = styled.div`
  position: relative; 
  word-break: break-all;
`;
const Inner = styled.div`
  position: absolute;
  left: 0;
  top: 10px;


  width: 200px;
  ${media.tablet`
    width: 100%;
  `}

  border-radius: 5px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
`;

export default class Popover extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }
  componentDidMount() {
    window.addEventListener('mousedown', this.checkClickOutside);
  }
  componentWillUnmount() {
    window.removeEventListener('mousedown', this.checkClickOutside);
  }
  setContainerRef = ref => {
    this._container = ref;
  }
  checkClickOutside = event => {
    if (this._container && !this._container.contains(event.target)) {
      this.props.handleClose();
    }
  }
  render() {
    const { open, children } = this.props;
    if (!open) {
      return null;
    }
    return (
      <Container innerRef={this.setContainerRef}>
        <Inner>
          {children}
        </Inner>
      </Container>
    );
  }
}
