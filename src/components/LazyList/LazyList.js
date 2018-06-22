import React, { Component } from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import { DimmedLoader } from '../';

const DEFAULT_OFFSET = 50;

export default class LazyList extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    initialLoad: PropTypes.func,
    isLast: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    lazyLoad: PropTypes.func.isRequired,
  }
  static defaultProps = {
    initialLoad: () => null,
  }
  componentDidMount() {
    this.props.initialLoad();
    document.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
    if (this.props.isLast) {
      return;
    }
    const { documentElement } = document;
    const { scrollTop, clientHeight, scrollHeight } = documentElement;
    if (scrollTop + clientHeight + DEFAULT_OFFSET >= scrollHeight) {
      this.handleLazyLoad();
    }
  }
  handleLazyLoad = throttle(() => {
    this.props.lazyLoad();
  }, 3000);
  render() {
    const { children, isLoading } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        { children }
        { isLoading && <DimmedLoader /> }
      </div>
    );
  }
}
