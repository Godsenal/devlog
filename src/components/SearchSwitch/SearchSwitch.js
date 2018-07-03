import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { LogList, UserList, TagList } from '../';
import { searchUser, searchLog, searchTag } from '../../actions/search';
import { emptyContainer } from '../../styles/util';

const NotFound = styled.div`
  ${emptyContainer()}
`;
class SearchSwitch extends Component {
  static propTypes = {
    dispatchSearchLog: PropTypes.func.isRequired,
    dispatchSearchTag: PropTypes.func.isRequired,
    dispatchSearchUser: PropTypes.func.isRequired,
    logState: PropTypes.object.isRequired,
    searchWord: PropTypes.string,
    tagState: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    userState: PropTypes.object.isRequired,
  }
  static defaultProps = {
    searchWord: '',
  }
  shouldComponentUpdate = (nextProps) => {
    if (this.props.type !== nextProps.type) {
      return true;
    }
    if (this.props.searchWord !== nextProps.searchWord) {
      return true;
    }
    if (this.props.logState !== nextProps.logState) {
      return true;
    }
    if (this.props.userState !== nextProps.userState) {
      return true;
    }
    if (this.props.tagState !== nextProps.tagState) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    const { type, searchWord } = this.props;
    this.handleLoad({ type, q: searchWord })({ skip: 0 });
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.type !== this.props.type ||
      prevProps.searchWord !== this.props.searchWord
    ) {
      const { type, searchWord } = this.props;
      this.handleLoad({
        type, q: searchWord,
      })({ skip: 0 });
    }
  }
  handleLoad = ({ type = 'logs', q = '' }) => ({ skip, limit }) => {
    switch (type) {
      case 'logs':
        this.props.dispatchSearchLog({ q, skip, limit });
        break;
      case 'users':
        this.props.dispatchSearchUser({ q, skip, limit });
        break;
      case 'tags':
        this.props.dispatchSearchTag({ q, skip, limit });
        break;
      default:
        break;
    }
  }
  getListData = (type = 'logs', searchWord) => {
    const q = searchWord;
    let data = {
      notFound: true,
    };
    switch (type) {
      // default param (log)
      case 'logs': {
        const { logState } = this.props;
        data = {
          ...data,
          ...logState,
          ListComponent: LogList,
          handleListLog: this.handleLoad({ type, q }),
          notFound: logState.logs.length <= 0 && logState.status === 'SUCCESS',
        };
        break;
      }
      case 'users': {
        const { userState } = this.props;
        data = {
          ...data,
          ...userState,
          ListComponent: UserList,
          handleListUser: this.handleLoad({ type, q }),
          notFound: userState.users.length <= 0 && userState.status === 'SUCCESS',
        };
        break;
      }
      case 'tags': {
        const { tagState } = this.props;
        data = {
          ...data,
          ...tagState,
          ListComponent: TagList,
          handleListTag: this.handleLoad({ type, q }),
          notFound: tagState.tags.length <= 0 && tagState.status === 'SUCCESS',
        };
        break;
      }
      default:
        break;
    }
    return data;
  }
  render() {
    const { type, searchWord } = this.props;
    if (!type || !searchWord) {
      return (
        <NotFound>
          <h3>Couldn't find anything.</h3>
        </NotFound>
      );
    }
    const listData = this.getListData(type, searchWord);
    const { notFound, ListComponent } = listData;
    return (
      <div>
        {
          !notFound ? <ListComponent {...listData} />
            : (
              <NotFound>
                <h3>Couldn't find anything.</h3>
              </NotFound>
            )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logState: state.search.log,
  userState: state.search.user,
  tagState: state.search.tag,
});
const mapDispatchToProps = dispatch => ({
  dispatchSearchLog: (payload) => dispatch(searchLog(payload)),
  dispatchSearchUser: (payload) => dispatch(searchUser(payload)),
  dispatchSearchTag: (payload) => dispatch(searchTag(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSwitch);
