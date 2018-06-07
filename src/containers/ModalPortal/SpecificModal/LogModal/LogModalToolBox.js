import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import TurnInNot from '@material-ui/icons/TurnedInNot';

const Container = styled.div`
  display: flex;
  
  width: 100%;
  height: 50px;

  margin: 10px 0px;

  justify-content: flex-end;
  align-items: center;
`;
export default class LogModalToolBox extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    handleStarLog: PropTypes.func.isRequired,
    logId: PropTypes.string.isRequired,
    stars: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
  }
  checkUserStared = () => {
    const { stars, userId } = this.props;
    return stars.indexOf(userId) !== -1;
  }
  handleStarLog = () => {
    const { logId, userId, handleStarLog } = this.props;
    const isStared = this.checkUserStared();
    const starData = {
      logId,
      userId,
      isStared,
    };
    handleStarLog(starData);
  }
  render() {
    const {
      count,
    } = this.props;
    return (
      <Container>
        <IconButton size="small" onClick={this.handleStarLog} >
          { this.checkUserStared() ? <StarIcon /> : <StarBorderIcon /> }
        </IconButton>
        {count}
        <IconButton size="small">
          <TurnInNot />
        </IconButton>
      </Container>
    );
  }
}
