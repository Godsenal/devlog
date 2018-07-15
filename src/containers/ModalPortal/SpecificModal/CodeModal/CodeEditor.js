import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { Dropdown } from '../../../../components';

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
class CodeEditor extends PureComponent {
  state = {
    open: false,
  }
  handleSelectOpen = () => {
    this.setState({
      open: true,
    });
  }
  handleSelectClose = () => {
    this.setState({
      open: false,
    });
  }
  handleSelect = (value) => () => {
    this.handleSelectClose();
    this.props.handleLanguageChange(value);
  }
  render() {
    const { open } = this.state;
    const { language, languageOptions, code, handleCodeChange } = this.props;
    return (
      <React.Fragment>
        <Editor>
          <AceEditor
            width="100%"
            height={`${EDITOR_HEIGHT}px`}
            minLines={20}
            maxLines={50}
            mode={language}
            theme="monokai"
            onChange={handleCodeChange}
            value={code}
            name="editor_code_block"
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              fontFamily: "Ubuntu Mono",
              fontSize: "16px"
            }}
          />
        </Editor>
        <DropdownBox>
          <Dropdown
            selected={language}
            open={open}
            upward
            handleOpen={this.handleSelectOpen}
            handleClose={this.handleSelectClose}
          >
            {languageOptions.map((item) => (
              <MenuItem key={item.value} value={item.value} onClick={this.handleSelect(item.value)}>{item.text}</MenuItem>
            ))}
          </Dropdown>
        </DropdownBox>
      </React.Fragment>
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  handleCodeChange: PropTypes.func.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  languageOptions: PropTypes.array.isRequired,
};

export default CodeEditor;
