import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.div`
  width: 90%;
  height: 300px;

  margin: 10px auto;
  padding: 10px;
  
  background-color: white;

  border-radius: 5px;


`;

export default class LogListItem extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired,
  }
  render() {
    const {
      message,
    } = this.props;
    return (
      <Item>
        {message}
      </Item>
    );
  }
}
