import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import './transition.css';

export default class Transition extends Component {
  static propTypes = {
    animation: PropTypes.string,
    children: PropTypes.node.isRequired,
    in: PropTypes.bool.isRequired,
    timeout: PropTypes.number.isRequired,
  }
  static defaultProps = {
    animation: 'boom',
  }
  render() {
    const { in: inProps, timeout, animation } = this.props;
    return (
      <CSSTransition in={inProps} classNames={animation} timeout={timeout} unmountOnExit>
        {this.props.children}
      </CSSTransition>
    );
  }
}
