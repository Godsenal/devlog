import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../styles/util';

const Container = styled.div`
  position: absolute;
  word-break: break-all;

  ${props => props.top && `top: ${props.top}px;`}
  ${props => props.left && `left: ${props.left}px;`}

  width: 200px;
  ${media.tablet`
    position: fixed;
    left: 0;
    width: 100%;
  `}
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
`;
export default class Popover extends Component {
  static propTypes = {
    anchorEl: PropTypes.any,
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
  }
  static defaultProps = {
    anchorEl: null,
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
  getCalculatedLeftAndTop = anchorEl => {
    const { width = 0, left, height = 0, top } = anchorEl.getBoundingClientRect();
    const calcTop = (top + height) + 5;
    const calcLeft = (left - 100) + (width / 2);
    return {
      calcTop,
      calcLeft,
    };
  }
  render() {
    const { anchorEl, children, open } = this.props;
    if (!anchorEl || !open) {
      return null;
    }
    const { calcTop, calcLeft } = this.getCalculatedLeftAndTop(anchorEl);
    return (
      <Container
        innerRef={this.setContainerRef}
        top={calcTop}
        left={calcLeft}
      >
        {children}
      </Container>
    );
  }
}
