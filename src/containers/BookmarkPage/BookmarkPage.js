import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { listBookmarks } from '../../actions/profile';
import { LogList, NotFound, HeaderText } from '../../components';
import { mainContainer } from '../../styles/util';

const Container = styled.div`
  ${mainContainer}
  max-width: 860px;
`;

class BookmarkPage extends Component {
  static propTypes = {
    bookmarkState: PropTypes.object.isRequired,
    dispatchListBookmark: PropTypes.func.isRequired,
    loginState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.handleLoadBookmark({});
  }
  handleLoadBookmark = ({ skip, limit }) => {
    this.props.dispatchListBookmark({ skip, limit });
  }
  render() {
    const { bookmarkState } = this.props;
    const { logs } = bookmarkState;
    return (
      <Container>
        <HeaderText>
          Your Bookmarks
        </HeaderText>
        <LogList
          {...bookmarkState}
          handleListLog={this.handleLoadBookmark}
        />
        { bookmarkState.status === 'SUCCESS' && logs.length === 0 && (
          <NotFound>
            Couldn't find any bookmark.
          </NotFound>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  bookmarkState: state.profile.bookmarks,
  loginState: state.user.login,
});

const mapDispatchToProps = dispatch => ({
  dispatchListBookmark: (payload) => dispatch(listBookmarks(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkPage);

