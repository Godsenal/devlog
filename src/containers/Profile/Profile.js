import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/user';

class Profile extends Component {
  componentDidMount() {
    const { nickname } = this.props.match.params;
    this.props.dispatchGetUser(nickname);
  }
  render() {
    const { userGetState } = this.props;
    console.log(userGetState.user);
    return (
      <div>
        Profile
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userGetState: state.user.get,
});
const mapDispatchToProps = dispatch => ({
  dispatchGetUser: (userId) => dispatch(getUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
