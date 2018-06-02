import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LogMainContent, CodeBox } from '../../../../components';
import { getLog } from '../../../../actions/log';

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
  render() {
    const { logGetState } = this.props;
    if (logGetState.status !== 'SUCCESS') {
      return <div>Loading...</div>;
    }
    const { log } = logGetState;
    return (
      <div>
        <LogMainContent {...log}>
          { log.has_code && (
            <CodeBox
              codeBlockType={log.code_type}
              code={log.code}
              language={log.code_language}
              frameSrc={log.frame_src}
              frameType={log.frame_type}
            />
          )}
        </LogMainContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logGetState: state.log.get,
});

export default connect(mapStateToProps)(LogModal);
