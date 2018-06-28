import { EditorState } from 'draft-js';
import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import grey from '@material-ui/core/colors/grey';

import 'draft-js-emoji-plugin/lib/plugin.css';

import EditorCodeBlock from './EditorCodeBlock';
import EditorDraftBlock from './EditorDraftBlock';
import EditorToolBox from './EditorToolBox';

import { showModal, closeModal } from '../../actions/modal';
import { addToast } from '../../actions/toast';
import { postLog } from '../../actions/log';
// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
import default_profile from '../../images/default_profile.png';

const Container = styled.div`
  position: relative;

  width: 100%;
  padding: 10px 20px;

  border: 1px solid ${grey[300]};
  border-radius: 5px;
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
  constructor() {
    super();
    this.state = { ...this.getInitialState() };
  }
  static propTypes = {
    addToast: PropTypes.func.isRequired,
    nickname: PropTypes.string.isRequired,
    postNewLog: PropTypes.func.isRequired,
    showCodeModal: PropTypes.func.isRequired,
    user_id: PropTypes.string.isRequired,
  }
  getInitialState = () => ({
    isEmpty: true,
    code: '',
    language: '',
    frameSrc: '',
    frameType: '',
    codeBlockType: 'editor',
    isFocused: false,
    hasCodeBlock: false,
    editorState: EditorState.createEmpty(),
  })
  /* Change Draftjs state */
  onChange = editorState => {
    this.setState({
      editorState,
    });
  }
  /* Focus handler */
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
  /* Show code modal when user clicked code button */
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
  /* edit/delete button inside code block */
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
  handleLog = () => {
    const {
      code,
      language,
      frameSrc,
      frameType,
      codeBlockType,
      hasCodeBlock,
      editorState,
    } = this.state;
    const text = editorState.getCurrentContent().getPlainText();
    if (!text || text.length < 10) {
      this.props.addToast({ message: 'Log must be at least 10 characters' });
      return;
    }
    /* TODO: Validate USER & editorState */
    const { user_id, nickname } = this.props;
    let logContent = {
      author_id: user_id,
      author_nickname: nickname,
    };
    if (hasCodeBlock) {
      logContent = {
        ...logContent,
        code_type: codeBlockType,
        code,
        code_language: language,
        frame_src: frameSrc,
        frame_type: frameType,
      };
    }
    logContent = {
      ...logContent,
      has_code: hasCodeBlock,
      text,
      content: editorState.getCurrentContent(),
    };
    this.props.postNewLog(logContent);
    this.setState({
      ...this.getInitialState(),
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
                <EditorToolBox
                  onCodeButtonClick={this.showCodeModal}
                  hasCodeBlock={hasCodeBlock}
                  handleLog={this.handleLog}
                />
              </div>
          }
        </EditorBlock>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  postLog: state.log.post,
  user_id: state.user.login._id,
  nickname: state.user.login.nickname,
});
const mapDispatchToProps = dispatch => ({
  showCodeModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
  closeCodeModal: () => dispatch(closeModal),
  postNewLog: (log) => dispatch(postLog(log)),
  addToast: (toastProps) => dispatch(addToast(toastProps)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogEditor);
