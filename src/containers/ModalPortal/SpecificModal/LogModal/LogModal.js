import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { LogMainContent, CodeBox } from '../../../../components';
import { getLog } from '../../../../actions/log';
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
    dispatch: PropTypes.func.isRequired,
    logGetState: PropTypes.object.isRequired,
    logId: PropTypes.string.isRequired,
  }
  componentDidMount() {
    const { dispatch, logId } = this.props;
    dispatch(getLog(logId));
  }
  handleClipboard = () => {
    const { code } = this.props.logGetState.log;
    // clipboard util function - return promise.
    clipboard(code); // TODO: Error handling with toast?
  }
  render() {
    const { logGetState } = this.props;
    if (logGetState.status !== 'SUCCESS') {
      return <div>Loading...</div>;
    }
    const { log } = logGetState;
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
        </LogMainContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logGetState: state.log.get,
});

export default connect(mapStateToProps)(LogModal);
