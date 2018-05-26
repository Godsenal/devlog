import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

const BoxWrapper = styled.div`
  border-radius: 10px;
  ${props => `
    width: ${typeof props.width === 'string' ? props.width : `${props.width}px`};
    height: ${typeof props.height === 'string' ? props.height : `${props.height}px`};
  `}
`;
const CodeEditorBox = ({ code, language, width, height }) => (
  <BoxWrapper width={width} height={height}>
    <AceEditor
      width="100%"
      height="100%"
      mode={language}
      theme="monokai"
      value={code}
      name="editor_code_block"
      editorProps={{ $blockScrolling: true }}
      readOnly
    />
  </BoxWrapper>
);

CodeEditorBox.propTypes = {
  code: PropTypes.string.isRequired,
  height: PropTypes.any,
  language: PropTypes.string.isRequired,
  width: PropTypes.any,
};
CodeEditorBox.defaultProps = {
  height: 200,
  width: '100%',
};

export default CodeEditorBox;
