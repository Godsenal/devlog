import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CommentIcon from 'react-icons/lib/fa/comment-o';
import BookmarkIcon from 'react-icons/lib/fa/bookmark-o';
import FullBookmarkIcon from 'react-icons/lib/fa/bookmark';
import StarIcon from 'react-icons/lib/fa/star-o';
import FullStarIcon from 'react-icons/lib/fa/star';
import { ButtonWithAuth, IconButton } from '../';
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
    commentCount: PropTypes.number,
    handleBookmark: PropTypes.func.isRequired,
    handleStarLog: PropTypes.func.isRequired,
    logId: PropTypes.string.isRequired,
    stars: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired,
  }
  static defaultProps = {
    commentCount: 0,
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
      commentCount,
    } = this.props;
    return (
      <Container>
        <IconButton>
          <CommentIcon />
        </IconButton>
        {commentCount}
        <ButtonWithAuth onClick={this.handleStarLog}>
          <IconButton>
            { this.checkUserStared() ? <FullStarIcon color="#ec5453" /> : <StarIcon /> }
          </IconButton>
        </ButtonWithAuth>
        {!!stars && stars.length}
        <ButtonWithAuth onClick={this.handleBookmark}>
          <IconButton>
            { this.checkUserBookmarked() ? <FullBookmarkIcon color="#1cba79" /> : <BookmarkIcon /> }
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
