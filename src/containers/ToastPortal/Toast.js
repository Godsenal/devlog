import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Transition } from '../../components';

const Item = styled.div`
  position: relative;

  border-radius: 5px;
  margin: 1rem auto;
  padding: 1rem 1.5rem;

  color: black;
  background-color: white;
  box-shadow: 3px 6px 16px rgba(0,0,0,.3);

  font-size: 1em;
  font-weight: bold;

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
  }
  static defaultProps = {
    animation: 'boom',
    timeout: 3000, // don't be confused with transition timout.
  }
  componentDidMount() {
    const { timeout, deleteToast } = this.props;
    setTimeout(deleteToast, timeout);
  }

  render() {
    const { message, deleteToast, in: inProps, animation } = this.props;
    return (
      <Transition in={inProps} animation={animation} >
        <Item onClick={deleteToast}>
          {message}
        </Item>
      </Transition>
    );
  }
}
