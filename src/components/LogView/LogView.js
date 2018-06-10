import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { LogViewToolBox, LogMainContent, LogComment, CodeBox } from '../';
import { getLog } from '../../actions/log';
import { addToast } from '../../actions/toast';
import { clipboard } from '../../utils';

const CodeContent = styled.div`
  position: relative;
`;
const Clipboard = styled.a`
  position: absolute;
  bottom: 0px;
  right: 0px;
  
  padding: 5px 10px;

  border-top-left-radius: 5px;
  background-color: rgba(0,0,0,0.3);
  color: white;
  cursor: pointer;
`;
class LogView extends Component {
  static propTypes = {
    handleAddToast: PropTypes.func.isRequired,
    handleGetLog: PropTypes.func.isRequired,
    logGetState: PropTypes.object.isRequired,
    logId: PropTypes.string.isRequired,
    userState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { logId, handleGetLog } = this.props;
    handleGetLog(logId);
  }
  handleClipboard = () => {
    const { handleAddToast } = this.props;
    const { code } = this.props.logGetState.log;
    clipboard(code)
      .then(() => {
        handleAddToast({
          message: 'Copied!',
        });
      })
      .catch(() => {
        handleAddToast({
          message: 'Fail to copy...',
        });
      });
  }
  render() {
    const {
      logGetState,
      userState,
    } = this.props;
    if (logGetState.status !== 'SUCCESS') {
      return <div>Loading...</div>;
    }
    const {
      log,
    } = logGetState;
    return (
      <div>
        <LogMainContent {...log} isModal>
          <CodeContent>
            { log.has_code && (
              <CodeBox
                codeBlockType={log.code_type}
                code={log.code}
                language={log.code_language}
                frameSrc={log.frame_src}
                frameType={log.frame_type}
              />
            )}
            { log.code_type === 'editor' && (
              <Clipboard onClick={this.handleClipboard}>Clip it</Clipboard>
            )}
          </CodeContent>
          <LogViewToolBox
            logId={log._id}
            bookmarks={userState.bookmarks}
            stars={log.stars}
            commentCount={log.comments && log.comments.length}
          />
          <LogComment comments={log.comments} />
        </LogMainContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.user.login,
  logGetState: state.log.get,
});
const mapDispatchToProps = dispatch => ({
  handleAddToast: (toastProps) => dispatch(addToast(toastProps)),
  handleGetLog: (logId) => dispatch(getLog(logId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogView);
