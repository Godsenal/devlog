import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { mainContainer } from '../../styles/util';

import { LogList, LogEditor } from '../../components';
import { listLog } from '../../actions/log';

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
/*
const Sidebar = styled.div`
  flex: 0 0 auto;

  max-width: 400px;
`;
*/

class Timeline extends Component {
  static propTypes = {
    handleListLog: PropTypes.func.isRequired,
    logList: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.props.handleListLog({ skip: 0 });
  }
  render() {
    const {
      logList,
      handleListLog,
    } = this.props;
    return (
      <Background>
        <Container>
          <MainContent>
            <LogEditor />
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
});
const mapDispatchToProps = dispatch => ({
  handleListLog: (payload) => dispatch(listLog(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
