import React from 'react';
import PropTypes from 'prop-types';
import CSSTransition from 'react-transition-group/CSSTransition';

import './transition.css';

const Transition = ({ animation, children, ...props }) => (
  <CSSTransition classNames={animation} {...props} unmountOnExit>
    {React.cloneElement(children)}
  </CSSTransition>
);

Transition.propTypes = {
  animation: PropTypes.string,
  children: PropTypes.node.isRequired,
  in: PropTypes.bool.isRequired,
  timeout: PropTypes.number,
};
Transition.defaultProps = {
  animation: 'boom',
  timeout: 300,
};

export default Transition;
