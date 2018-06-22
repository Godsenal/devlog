import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Dimmer = styled.div`
  position: absolute;
  left: 0;
  top: 2rem;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, .6);

  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DimmedLoader = () => (
  <Dimmer>
    <CircularProgress color="primary" />
  </Dimmer>
);
export default DimmedLoader;
