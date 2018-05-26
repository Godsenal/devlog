import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const EDITOR_HEIGHT = 200;

const Editor = styled.div`
  width: 100%;
  min-height: ${EDITOR_HEIGHT}px;

  border-radius: 10px;

  overflow-y: auto;
`;
const DropdownBox = styled.div`
  width: 100%;

  text-align: right;

  color: black;
`;

const CodeEditor = ({ language, languageOptions, code, handleCodeChange, handleLanguageChange }) => (
  <React.Fragment>
    <Editor>
      <AceEditor
        width="100%"
        height={`${EDITOR_HEIGHT}px`}
        mode={language}
        theme="monokai"
        onChange={handleCodeChange}
        value={code}
        name="editor_code_block"
        editorProps={{ $blockScrolling: true }}
      />
    </Editor>
    <DropdownBox>
      <Dropdown
        inline
        upward
        scrolling
        floating
        value={language}
        options={languageOptions}
        onChange={handleLanguageChange}
      />
    </DropdownBox>
  </React.Fragment>
);

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  handleCodeChange: PropTypes.func.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  languageOptions: PropTypes.array.isRequired,
};

export default CodeEditor;
