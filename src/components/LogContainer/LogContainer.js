import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../styles/util';

import { LogList } from '../';
import { listLog } from '../../actions/log';

const Background = styled.div`
  width: 100%;
  height: 100%;

  background-color: #F2F2F2;
`;

const Container = styled.div`
  display: flex;
  
  width: 80%;
  ${media.tablet`width: 90%;`}
  min-height: 800px;
  
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;

  justify-content: space-between;

  overflow-y: auto;

`;
const Sidebar = styled.div`
  flex: 0 0 auto;

  max-width: 400px;
`;

class LogContainer extends Component {
  static propTypes = {
    handleListLog: PropTypes.func.isRequired,
    isMobile: PropTypes.bool.isRequired,
    logList: PropTypes.object.isRequired,
  }
  render() {
    const {
      isMobile,
      logList,
      handleListLog,
    } = this.props;
    return (
      <Background onScroll={this.handleScroll} >
        <Container>
          <LogList logs={logList.logs} handleListLog={handleListLog} />
          {
            isMobile ?
              null :
              <Sidebar>
                side
              </Sidebar>
          }
        </Container>
      </Background>
    );
  }
}

const mapStateToProps = state => ({
  logList: state.log.list,
});
const mapDispatchToProps = dispatch => ({
  handleListLog: (skip, limit, min_id) => dispatch(listLog({ skip, limit, min_id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogContainer);
