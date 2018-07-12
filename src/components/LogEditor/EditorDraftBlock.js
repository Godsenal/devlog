import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import grey from '@material-ui/core/colors/grey';

import 'draft-js/dist/Draft.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

// margin-left : profile width
const EditorContainer = styled.div`
  position: relative;
  ${({ isFocused }) => isFocused && 'min-height: 100px;'}
  padding: 10px 12px;

  border: 1px solid ${grey[300]};
  ${({ isDraftFocused }) => isDraftFocused && 'border-width: 1.5px;'}
  border-radius: 10px;

  font-size: 16px;
  line-height: 20px;

  background: white;

  cursor: text;
  
`;
class EditorDraftBlock extends Component {
  state = {
    isDraftFocused: false,
  }
  static propTypes = {
    editorState: PropTypes.object.isRequired,
    isFocused: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func.isRequired,
  }
  setEditorRef = ref => { this.editor = ref; };
  focusOnEditor = () => {
    if (this.editor) {
      this.props.onFocus();
      this.editor.focus();
    }
  }
  onDraftFocus = () => {
    this.setState({
      isDraftFocused: true,
    });
  }
  onDraftBlur = () => {
    this.setState({
      isDraftFocused: false,
    });
  }
  render() {
    const { isDraftFocused } = this.state;
    const {
      isFocused,
      editorState,
      onChange,
    } = this.props;
    return (
      <EditorContainer
        isFocused={isFocused}
        isDraftFocused={isDraftFocused}
        onClick={this.focusOnEditor}
      >
        <Editor
          placeholder={`Write your today's log ${String.fromCodePoint(0x1F600)}`}
          editorState={editorState}
          onFocus={this.onDraftFocus}
          onBlur={this.onDraftBlur}
          onChange={onChange}
          plugins={[emojiPlugin]}
          ref={this.setEditorRef}
        />
        <EmojiSuggestions style={{ zIndex: 9 }} />
      </EditorContainer>
    );
  }
}

export default EditorDraftBlock;
