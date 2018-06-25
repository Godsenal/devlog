import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { media } from '../../styles/util';

const Container = styled.div`
  position: absolute;
  word-break: break-all;

  left: ${props => `${props.left}px`};
  top: ${props => `${props.top}px`};

  width: 200px;
  ${media.tablet`
    position: fixed;
    left: 0;
    top:  ${props => `${props.top}px`};
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
    const { width = 0, height = 0, left, top } = anchorEl.getBoundingClientRect();
    const defaultTopGap = 20;
    const calcLeft = (left - 100) + (width / 2);
    const calcTop = top + height + defaultTopGap;
    return {
      calcLeft,
      calcTop,
    };
  }
  render() {
    const { anchorEl, children, open } = this.props;
    if (!anchorEl || !open) {
      return null;
    }
    const { calcLeft, calcTop } = this.getCalculatedLeftAndTop(anchorEl);
    return (
      <Container
        innerRef={this.setContainerRef}
        left={calcLeft}
        top={calcTop}
      >
        {children}
      </Container>
    );
  }
}
