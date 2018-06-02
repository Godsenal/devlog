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
  code: PropTypes.string,
  codeBlockType: PropTypes.string.isRequired,
  frameSrc: PropTypes.string,
  frameType: PropTypes.string,
  language: PropTypes.string,
};

CodeBox.defaultProps = {
  code: '',
  frameSrc: '',
  frameType: '',
  language: '',
};

export default CodeBox;

