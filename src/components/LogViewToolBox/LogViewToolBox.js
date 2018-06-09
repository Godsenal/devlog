import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import TurnInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { ButtonWithAuth } from '../';

const Container = styled.div`
  display: flex;
  
  width: 100%;
  height: 50px;

  margin: 10px 0px;

  justify-content: flex-end;
  align-items: center;
`;
export default class LogViewToolBox extends Component {
  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
    count: PropTypes.number.isRequired,
    handleBookmark: PropTypes.func.isRequired,
    handleStarLog: PropTypes.func.isRequired,
    logId: PropTypes.string.isRequired,
    stars: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
  }
  checkUserStared = () => {
    const { stars, userId } = this.props;
    return stars.indexOf(userId) !== -1;
  }
  checkUserBookmarked = () => {
    const { bookmarks, logId } = this.props;
    return bookmarks.indexOf(logId) !== -1;
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
  handleBookmark = () => {
    const { logId, userId, handleBookmark } = this.props;
    const isBookmarked = this.checkUserBookmarked();
    const bookmarkData = {
      logId,
      userId,
      isBookmarked,
    };
    handleBookmark(bookmarkData);
  }
  render() {
    const {
      count,
    } = this.props;
    return (
      <Container>
        <ButtonWithAuth onClick={this.handleStarLog}>
          <IconButton >
            { this.checkUserStared() ? <StarIcon /> : <StarBorderIcon /> }
          </IconButton>
        </ButtonWithAuth>
        {count}
        <ButtonWithAuth onClick={this.handleBookmark}>
          <IconButton>
            { this.checkUserBookmarked() ? <TurnedInIcon /> : <TurnInNotIcon /> }
          </IconButton>
        </ButtonWithAuth>
      </Container>
    );
  }
}
