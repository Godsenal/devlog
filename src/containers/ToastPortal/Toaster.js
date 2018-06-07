import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Toast from './Toast';

const List = styled.div`
  position: fixed;
  
  max-width: 300px;
  
  top: 0;
  left: 0;
  right: 0;
  z-index: 101;

  margin: auto;
`;

export default class Toaster extends Component {
  static propTypes = {
    deleteToast: PropTypes.func.isRequired,
    toasts: PropTypes.array.isRequired,
  }

  render() {
    const { toasts, deleteToast } = this.props;
    return (
      <TransitionGroup component={List}>
        {
          toasts.map(toast => (
            <Toast key={toast.id} deleteToast={() => deleteToast(toast.id)} {...toast} />
          ))
        }
      </TransitionGroup>
    );
  }
}
