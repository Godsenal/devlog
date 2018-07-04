import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

import { Transition } from '../../components';

const Item = styled.div`
  position: relative;

  border-radius: 5px;
  margin: 1rem auto;
  padding: 1rem 1.5rem;

  color: white;
  background-color: ${props => props.backgroundColor};
  box-shadow: 3px 6px 16px rgba(0,0,0,.3);

  font-size: 1em;
  font-weight: bold;

  text-align: center;
  
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default class Toast extends Component {
  static propTypes = {
    animation: PropTypes.string,
    deleteToast: PropTypes.func.isRequired,
    in: PropTypes.bool,
    message: PropTypes.string.isRequired,
    timeout: PropTypes.number,
    type: PropTypes.string,
  }
  static defaultProps = {
    animation: 'boom',
    timeout: 3000, // don't be confused with transition timout.
    type: 'default',
  }
  componentDidMount() {
    const { timeout, deleteToast } = this.props;
    setTimeout(deleteToast, timeout);
  }
  getColorByType = (type) => {
    switch (type) {
      case 'success':
        return green[600];
      case 'error':
        return red[600];
      default:
        return grey[600];
    }
  }
  render() {
    const { message, deleteToast, in: inProps, animation, type } = this.props;
    return (
      <Transition in={inProps} animation={animation} >
        <Item onClick={deleteToast} backgroundColor={this.getColorByType(type)}>
          {message}
        </Item>
      </Transition>
    );
  }
}
