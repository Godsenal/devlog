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
import EditorTagBlock from './EditorTagBlock';

import { Avatar } from '../';
import { showModal, closeModal } from '../../actions/modal';
import { addToast } from '../../actions/toast';
import { postLog } from '../../actions/log';
// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.

const Container = styled.div`
  position: relative;

  width: 100%;
  padding: 10px 20px;

  border: 1px solid ${grey[300]};
  border-radius: 5px;

  background-color: white;
`;

const EditorBlock = styled.div`
  margin-left: 50px;
`;

const ProfileImage = styled.span`
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
    dispatchShowModal: PropTypes.func.isRequired,
    imageUrl: PropTypes.string.isRequired,
    postNewLog: PropTypes.func.isRequired,
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
    tags: [],
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
    this.props.dispatchShowModal('CODE_MODAL', modalProps);
  }
  showTagModal = () => {
    const { tags } = this.state;
    const modalProps = {
      selectedTags: tags,
      handleTagChange: this.handleTagChange,
    };
    this.props.dispatchShowModal('TAG_MODAL', modalProps);
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
  handleTagChange = (tags) => {
    this.setState({
      tags,
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
      tags,
    } = this.state;
    const text = editorState.getCurrentContent().getPlainText();
    if (!text || text.length < 10) {
      this.props.addToast({ message: 'Log must be at least 10 characters', type: 'error' });
      return;
    }
    /* TODO: Validate USER & editorState */
    const { user_id } = this.props;
    let logContent = {
      author: user_id,
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
      tags,
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
      tags,
    } = this.state;
    const {
      imageUrl,
    } = this.props;
    return (
      <Container innerRef={this.setContainerRef}>
        <ProfileImage>
          <Avatar size={32} src={imageUrl || undefined} alt="default profile" />
        </ProfileImage>
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
                { tags.length > 0 && <EditorTagBlock tags={tags} showTagModal={this.showTagModal} /> }
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
                  onTagButtonClick={this.showTagModal}
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
  imageUrl: state.user.login.imageUrl,
});
const mapDispatchToProps = dispatch => ({
  dispatchShowModal: (type, modalProps) => dispatch(showModal(type, modalProps)),
  dispatchCloseModal: () => dispatch(closeModal),
  postNewLog: (log) => dispatch(postLog(log)),
  addToast: (toastProps) => dispatch(addToast(toastProps)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogEditor);
