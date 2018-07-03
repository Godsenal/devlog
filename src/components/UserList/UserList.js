import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LazyList, UserListItem } from '../';
import LoadingWrapper from '../LoadingWrapper';

class UserList extends Component {
  static propTypes = {
    handleListUser: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    users: PropTypes.array.isRequired,
  }
  handleLazyLoad = () => {
    const { users } = this.props;
    this.props.handleListUser({ skip: users.length });
  }
  render() {
    const { users, status, isLast } = this.props;
    return (
      <div>
        <LazyList
          lazyLoad={this.handleLazyLoad}
          isLast={isLast}
          isLoading={status === 'WAITING'}
        >
          { users.map((user, i) => <UserListItem key={i} {...user} />)}
        </LazyList>
      </div>
    );
  }
}

export default LoadingWrapper(UserList);
