import React, { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import { Tabs, FollowList, ProfileContent } from '../../components';

const TABS = [
  {
    type: 'latest',
    label: 'Latest',
    path: '',
  },
  {
    type: 'stars',
    label: 'Stars',
    path: '/stars',
  },
];
export default class ProfileSwitch extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    nickname: PropTypes.string.isRequired,
  }
  shouldComponentUpdate = (nextProps) => {
    if (this.props.match.params.type !== nextProps.match.params.type) {
      return true;
    }
    return false;
  }
  getCurrentTab = (type = 'latest') => findIndex(TABS, (tab) => tab.type === type)
  handleTabChange = (_, tab) => {
    const { nickname, history } = this.props;
    history.push(`/@${nickname}${TABS[tab].path}`);
  }
  render() {
    const { match, _id, nickname } = this.props;
    const { type } = match.params;
    const tab = this.getCurrentTab(type);
    return (
      <div>
        <Tabs selected={tab} handleTabChange={this.handleTabChange}>
          {
            TABS.map((tabItem, i) => <span key={i}>{tabItem.label}</span>)
          }
        </Tabs>
        {
          tab < 0 ? (
            <FollowList
              nickname={nickname}
              type={type}
            />
          ) : (
            <ProfileContent
              _id={_id}
              nickname={nickname}
              type={TABS[tab].type}
            />
          )
        }
      </div>
    );
  }
}
