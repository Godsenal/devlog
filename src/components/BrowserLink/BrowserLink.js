import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history } from '../../utils';

export default class BrowserLink extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    location: PropTypes.any,
    type: PropTypes.string,
  }
  static defaultProps = {
    type: 'push',
  }
  handleLocation = () => {
    const { location, type } = this.props;
    history[type](location);
  }

  render() {
    return (
      <span onClick={this.handleLocation}>
        {this.props.children}
      </span>
    );
  }
}
