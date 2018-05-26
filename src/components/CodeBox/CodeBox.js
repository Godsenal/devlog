import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CodeFrameBox, CodeEditorBox } from '../';

const Container = styled.div`
  width: 100%;

  margin-top: 1rem;
`;
const CodeBox = ({ codeBlockType, code, language, frameSrc, frameType }) => (
  <Container>
    {
      codeBlockType === 'editor' ?
        <CodeEditorBox
          code={code}
          language={language}
        />
        :
        <CodeFrameBox
          src={frameSrc}
          type={frameType}
        />
    }
  </Container>
);

CodeBox.propTypes = {
  code: PropTypes.string.isRequired,
  codeBlockType: PropTypes.string.isRequired,
  frameSrc: PropTypes.string.isRequired,
  frameType: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
};

export default CodeBox;

