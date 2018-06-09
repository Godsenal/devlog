import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import TurnInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import { ButtonWithAuth } from '../';
import { bookmark } from '../../actions/user';
import { getLog, starLog } from '../../actions/log';
import { addToast } from '../../actions/toast';

const Container = styled.div`
  display: flex;
  
  width: 100%;
  height: 50px;

  justify-content: flex-end;
  align-items: center;
`;
class LogViewToolBox extends Component {
  static propTypes = {
    bookmarks: PropTypes.array.isRequired,
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
    const { userId, logId, handleStarLog } = this.props;
    const isStared = this.checkUserStared();
    const starData = {
      logId,
      userId,
      isStared,
    };
    handleStarLog(starData);
  }
  handleBookmark = () => {
    const { userId, logId, handleBookmark } = this.props;
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
      stars,
    } = this.props;
    return (
      <Container>
        <ButtonWithAuth onClick={this.handleStarLog}>
          <IconButton >
            { this.checkUserStared() ? <StarIcon color="secondary" /> : <StarBorderIcon /> }
            {!!stars && stars.length}
          </IconButton>
        </ButtonWithAuth>
        <ButtonWithAuth onClick={this.handleBookmark}>
          <IconButton>
            { this.checkUserBookmarked() ? <TurnedInIcon /> : <TurnInNotIcon /> }
          </IconButton>
        </ButtonWithAuth>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  bookmarks: state.user.login.bookmarks,
  userId: state.user.login._id,
});
const mapDispatchToProps = dispatch => ({
  handleBookmark: (bookmarkData) => dispatch(bookmark({ ...bookmarkData })),
  handleAddToast: (toastProps) => dispatch(addToast(toastProps)),
  handleGetLog: (logId) => dispatch(getLog(logId)),
  handleStarLog: (starData) => dispatch(starLog({ ...starData })),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogViewToolBox);
