import React from 'react';
import styled from 'styled-components';
import { Loader } from 'semantic-ui-react';

const Dimmer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
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
    <Loader active />
  </Dimmer>
);
export default DimmedLoader;
