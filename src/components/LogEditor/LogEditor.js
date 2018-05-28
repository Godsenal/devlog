import { EditorState } from 'draft-js';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import 'draft-js-emoji-plugin/lib/plugin.css';

import EditorCodeBlock from './EditorCodeBlock';
import EditorDraftBlock from './EditorDraftBlock';
import EditorToolBox from './EditorToolBox';

import { showModal, closeModal } from '../../actions/modal';
// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
import default_profile from '../../images/default_profile.png';

const Container = styled.div`
  position: relative;

  width: 100%;
  padding: 10px 20px;

  border-radius: 10px;

  background-color: rgba(0, 0, 0, 0.7);
`;

const EditorBlock = styled.div`
  margin-left: 50px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;

  border-radius: 50%;

  position: absolute;

  top: 15px;
  left: 20px;
`;
class LogEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      language: '',
      frameSrc: '',
      frameType: '',
      codeBlockType: 'editor',
      isFocused: false,
      hasCodeBlock: false,
      editorState: EditorState.createEmpty(),
    };
  }
  static propTypes = {
    // nickname: PropTypes.string.isRequired,
    showCodeModal: PropTypes.func.isRequired,
  }
  onChange = editorState => {
    this.setState({
      editorState,
    });
  }
  onFocus = () => {
    this.setState({
      isFocused: true,
    });
  }
  onBlur = () => {
    this.setState({
      isFocused: false,
    });
  }
  showCodeModal = () => {
    const { codeBlockType, code, language, frameSrc, frameType } = this.state;
    const modalProps = {
      codeBlockType,
      code,
      language,
      frameSrc,
      frameType,
      handleCodeBlockChange: this.handleCodeBlockChange,
    };
    this.props.showCodeModal('CODE_MODAL', modalProps);
  }
  setContainerRef = (ref) => {
    this.container = ref;
  }
  handleCodeBlockChange = ({ codeBlockType, code, language, frameSrc, frameType }) => {
    let changedState = {
      codeBlockType: 'editor',
      code: '',
      language: '',
      frameSrc: '',
      frameType: '',
      hasCodeBlock: true,
    };
    if (codeBlockType === 'editor') {
      changedState = {
        ...changedState,
        codeBlockType,
        code,
        language,
      };
    }
    else {
      changedState = {
        ...changedState,
        codeBlockType,
        frameSrc,
        frameType,
      };
    }
    this.setState({
      ...changedState,
    });
  }
  toggleCodeBlock = () => {
    this.setState(state => ({
      showCodeBlock: !state.showCodeBlock,
    }));
  }
  editCodeBlock = (e) => {
    e.stopPropagation();
    this.showCodeModal();
  }
  deleteCodeBlock = (e) => {
    e.stopPropagation();
    this.setState({
      code: '',
      language: '',
      frameSrc: '',
      frameType: '',
      codeBlockType: 'editor',
      hasCodeBlock: false,
    });
  }
  render() {
    const {
      editorState,
      isFocused,
      hasCodeBlock,
      codeBlockType,
      code,
      language,
      frameSrc,
      frameType,
    } = this.state;
    return (
      <Container innerRef={this.setContainerRef}>
        { /* TODO: LOGIN PROFILE */}
        <ProfileImage src={default_profile} alt="default profile" />
        <EditorBlock>
          <EditorDraftBlock
            onFocus={this.onFocus}
            isFocused={isFocused}
            editorState={editorState}
            onChange={this.onChange}
          />
          {
            isFocused &&
              <div>
                {
                  hasCodeBlock &&
                    <EditorCodeBlock
                      editCodeBlock={this.editCodeBlock}
                      deleteCodeBlock={this.deleteCodeBlock}
                      codeBlockType={codeBlockType}
                      code={code}
                      language={language}
                      frameSrc={frameSrc}
                      frameType={frameType}
                    />
                }
                <EditorToolBox onCodeButtonClick={this.showCodeModal} hasCodeBlock={hasCodeBlock} handleLog={this.handleLog} />
              </div>
          }
        </EditorBlock>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  nickname: state.user.login.nickname,
});
const mapDispatchToProps = dispatch => ({
  showCodeModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
  closeCodeModal: () => dispatch(closeModal),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogEditor);
