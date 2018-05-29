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
    isMobile: PropTypes.bool.isRequired,
    listLog: PropTypes.func.isRequired,
    logList: PropTypes.object.isRequired,
  }
  componentDidMount = () => {
    this.props.listLog();
  }
  render() {
    const {
      isMobile,
      logList,
    } = this.props;
    return (
      <Background>
        <Container>
          <LogList logs={logList.logs} />
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
  listLog: (lastLogId, limit) => dispatch(listLog({ lastLogId, limit })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogContainer);
