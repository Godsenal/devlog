import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queryString from 'query-string';
import findIndex from 'lodash/findIndex';
import { Tabs, SearchSwitch, Input } from '../../components';
import { mainContainer } from '../../styles/util';

const TABS = [
  {
    path: '/',
    text: 'logs',
  },
  {
    path: '/users',
    text: 'users',
  },
];
const checkType = (type = 'logs') => {
  const check = TABS.filter(tab => tab.text === type);
  if (check.length <= 0) {
    return '';
  }
  return type;
};
const Container = styled.div`
  ${mainContainer()}
  max-width: 800px;
`;
class Search extends Component {
  state = {
    searchWord: queryString.parse(this.props.location.search).q || '',
    selected: findIndex(TABS, tab => tab.text === checkType(this.props.match.params.type)),
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.location.search !== prevProps.location.search) {
      this.setState({
        searchWord: queryString.parse(this.props.location.search).q,
      });
    }
  }
  handleInputChange = (e) => {
    this.setState({
      searchWord: e.target.value,
    });
  }
  handleInputEnter = (e) => {
    if (e.key === 'Enter') {
      const { searchWord } = this.state;
      if (!searchWord) {
        return;
      }
      const currentTab = TABS[this.state.selected];
      this.handleSearch(currentTab.path, this.state.searchWord);
    }
  }
  handleTabChange = (_, selected) => {
    const { path } = TABS[selected];
    const { searchWord } = this.state;
    this.handleSearch(path, searchWord);
    this.setState({
      selected,
    });
  }
  handleSearch = (path, searchWord) => {
    this.props.history.push(`/search${path}?q=${searchWord}`);
  }
  render() {
    const { selected, searchWord } = this.state;
    const { match, location } = this.props;
    const { q } = queryString.parse(location.search);
    return (
      <Container>
        <Input
          value={searchWord}
          placeholder="Search DEVLOG..."
          onChange={this.handleInputChange}
          onKeyDown={this.handleInputEnter}
        />
        <Tabs
          selected={selected}
          handleTabChange={this.handleTabChange}
        >
          {TABS.map((tab, i) => (
            <span key={i}>{tab.text}</span>
          ))}
        </Tabs>
        <SearchSwitch type={checkType(match.params.type)} searchWord={q} />
      </Container>
    );
  }
}

export default Search;
