import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LogModalToolBox from './LogModalToolBox';
import { LogMainContent, CodeBox } from '../../../../components';
import { getLog, starLog } from '../../../../actions/log';
import { clipboard } from '../../../../utils';

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
class LogModal extends Component {
  static propTypes = {
    handleGetLog: PropTypes.func.isRequired,
    handleStarLog: PropTypes.func.isRequired,
    logGetState: PropTypes.object.isRequired,
    logId: PropTypes.string.isRequired,
    logStarState: PropTypes.object.isRequired,
    userState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { logId, handleGetLog } = this.props;
    handleGetLog(logId);
  }
  handleClipboard = () => {
    const { code } = this.props.logGetState.log;
    // clipboard util function - return promise.
    clipboard(code); // TODO: Error handling with toast?
  }
  render() {
    const {
      logGetState,
      logStarState,
      userState,
      handleStarLog,
    } = this.props;
    if (logGetState.status !== 'SUCCESS') {
      return <div>Loading...</div>;
    }
    const {
      log,
    } = logGetState;
    return (
      <div>
        <LogMainContent {...log}>
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
          <LogModalToolBox
            logId={log._id}
            userId={userState._id}
            handleStarLog={handleStarLog}
            {...logStarState}
          />
        </LogMainContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userState: state.user.login,
  logGetState: state.log.get,
  logStarState: state.log.star,
});
const mapDispatchToProps = dispatch => ({
  handleGetLog: (logId) => dispatch(getLog(logId)),
  handleStarLog: (starData) => dispatch(starLog({ ...starData })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogModal);
