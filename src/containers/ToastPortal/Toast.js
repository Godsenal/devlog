import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Transition } from '../../components';

const Item = styled.div`
  position: relative;
  width: 200px;
  height: 100px;

  border-radius: 5px;
  margin: 1rem auto;

  color: white;
  background-color: pink;

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
    timeout: 3000,
  }
  componentDidMount() {
    const { timeout, deleteToast } = this.props;
    setTimeout(deleteToast, timeout);
  }

  render() {
    const { message, deleteToast, timeout, animation, in: inProps } = this.props;
    return (
      <Transition in={inProps} timeout={timeout} animation={animation}>
        <Item onClick={deleteToast}>
          {message}
        </Item>
      </Transition>
    );
  }
}
