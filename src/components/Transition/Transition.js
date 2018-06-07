import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import './transition.css';

export default class Transition extends Component {
  static propTypes = {
    animation: PropTypes.string,
    children: PropTypes.node.isRequired,
    in: PropTypes.bool.isRequired,
    timeout: PropTypes.number,
  }
  static defaultProps = {
    animation: 'boom',
    timeout: 300,
  }
  render() {
    const { animation, children } = this.props;
    return (
      <CSSTransition classNames={animation} {...this.props} unmountOnExit>
        {React.cloneElement(children)}
      </CSSTransition>
    );
  }
}
