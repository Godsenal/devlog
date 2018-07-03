import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DimmedLoader } from '../';

const Container = styled.div`
  position: relative;
`;

export default function LoadingWrapper(WrappedComponent) {
  return class extends React.Component {
    static propTypes = {
      isInit: PropTypes.bool,
      status: PropTypes.string,
    }
    static defaultProps = {
      isInit: false,
      status: '',
    }
    render() {
      const { isInit, status } = this.props;
      if (isInit && status === 'WAITING') {
        return <Container><DimmedLoader /></Container>;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

