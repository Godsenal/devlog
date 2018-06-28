import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { LogListItem, UserListItem, LazyList } from '../';
import { searchUser, searchLog } from '../../actions/search';
import { emptyContainer } from '../../styles/util';

const NotFound = styled.div`
  ${emptyContainer()}
`;
class SearchSwitch extends Component {
  static propTypes = {
    dispatchSearchLog: PropTypes.func.isRequired,
    dispatchSearchUser: PropTypes.func.isRequired,
    logState: PropTypes.object.isRequired,
    searchWord: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    userState: PropTypes.object.isRequired,
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
    return false;
  }
  componentDidMount() {
    const { type, searchWord } = this.props;
    this.handleLoad({ type, q: searchWord })();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.type !== this.props.type ||
      prevProps.searchWord !== this.props.searchWord
    ) {
      const { type, searchWord } = this.props;
      this.handleLoad({
        type, q: searchWord,
      })();
    }
  }
  handleLoad = ({ type = 'logs', q, skip = 0 }) => () => {
    switch (type) {
      case 'logs':
        this.props.dispatchSearchLog({ q, skip });
        break;
      case 'users':
        this.props.dispatchSearchUser({ q, skip });
        break;
      default:
        break;
    }
  }
  getListData = (type = 'logs') => {
    switch (type) {
      // default param (log)
      case 'logs': {
        const { logState } = this.props;
        return {
          ...logState,
          data: logState.logs,
          ItemComp: LogListItem,
        };
      }
      case 'users': {
        const { userState } = this.props;
        return {
          ...userState,
          data: userState.users,
          ItemComp: UserListItem, // User List Item
        };
      }
      default:
        break;
    }
  }
  render() {
    const { type, searchWord } = this.props;
    if (!type) {
      return <div>NOT FOUND</div>;
    }
    const { isLast, status, data, ItemComp } = this.getListData(type);
    return (
      <div>
        {
          data.length > 0 ?
            <LazyList
              isLast={isLast}
              isLoading={status === 'WAITING'}
              lazyLoad={this.handleLoad({ type, q: searchWord, skip: data.length })}
            >
              {data.map((item, i) => <ItemComp key={i} {...item} />)}
            </LazyList>
            :
            <NotFound>
              <h3>Couldn't find anything.</h3>
            </NotFound>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logState: state.search.log,
  userState: state.search.user,
});
const mapDispatchToProps = dispatch => ({
  dispatchSearchLog: (payload) => dispatch(searchLog(payload)),
  dispatchSearchUser: (payload) => dispatch(searchUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchSwitch);
