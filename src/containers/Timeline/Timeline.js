import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { mainContainer } from '../../styles/util';

import { LogList, LogEditor } from '../../components';
import { listLog, connectSocket, disconnectSocket } from '../../actions/log';

const Background = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  ${mainContainer()}
  display: flex;

  justify-content: space-between;

`;
const MainContent = styled.div`
  flex: 1 1 auto;

  width: 90%;
  max-width: 800px;

  margin: 10px auto;
`;
const ButtonWrapper = styled.div`
  text-align: center;

  margin: 20px 0;
`;
/*
const Sidebar = styled.div`
  flex: 0 0 auto;

  max-width: 400px;
`;
*/

class Timeline extends Component {
  static propTypes = {
    handleConnectSocket: PropTypes.func.isRequired,
    handleDisconnectSocket: PropTypes.func.isRequired,
    handleListLog: PropTypes.func.isRequired,
    logList: PropTypes.object.isRequired,
    newCount: PropTypes.number.isRequired,
  }
  componentDidMount() {
    this.handleInitialList();
    this.props.handleConnectSocket();
  }
  componentWillUnmount() {
    this.props.handleDisconnectSocket();
  }
  handleInitialList = () => {
    this.props.handleListLog({ skip: 0 });
  }
  render() {
    const {
      logList,
      handleListLog,
      newCount,
    } = this.props;
    return (
      <Background>
        <Container>
          <MainContent>
            <LogEditor />
            { newCount > 0 && (
              <ButtonWrapper>
                <Button variant="contained" size="large" color="primary" onClick={this.handleInitialList}>
                  {newCount} more logs
                </Button>
              </ButtonWrapper>
            )}
            <LogList
              {...logList}
              handleListLog={handleListLog}
            />
          </MainContent>
        </Container>
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  logList: state.log.list,
  newCount: state.log.new.count,
});
const mapDispatchToProps = dispatch => ({
  handleListLog: (payload) => dispatch(listLog(payload)),
  handleConnectSocket: () => dispatch(connectSocket()),
  handleDisconnectSocket: () => dispatch(disconnectSocket()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
