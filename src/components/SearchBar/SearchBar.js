import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import SearchIcon from 'react-icons/lib/md/search';
import { Avatar, Popover } from '../';
import { searchPre, searchPreClear } from '../../actions/search';
import { defaultPadding, linkText } from '../../styles/util';
import { history } from '../../utils';

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  color: rgba(0, 0, 0, 0.65);
`;
const IconWrapper = styled.span`
  margin-right: 10px;

`;
const Input = styled.input`
  width: ${props => (props.isFocused ? '200px' : '1px')};
  height: 20px;
  border: none;
  outline: none;

  transition: width 0.2s ease;
`;
const ResultHeader = styled.a`
  display: block;

  ${defaultPadding()}
  ${linkText()}
`;
const PreList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
const ListItem = styled.a`
  display: flex;
  align-items: center;

  ${defaultPadding()}
  ${linkText()}
`;
const ListHeader = styled.div`
  font-weight: 600;
  ${defaultPadding()}
`;
const AvatarText = styled.span`
  margin-left: 10px;  
`;
const VK_LEFT = 37;
const VK_UP = 38;
const VK_RIGHT = 39;
const VK_DOWN = 40;
class SearchBar extends PureComponent {
  state = {
    searchWord: '',
    isFocused: false,
  }
  static propTypes = {
    dispatchSearchPre: PropTypes.func.isRequired,
    dispatchSearchPreClear: PropTypes.func.isRequired,
    preState: PropTypes.object.isRequired,
  }
  componentDidUpdate(prevProps) {
    if (prevProps.preState.results !== this.props.preState.results) {
      this.updatePreRef();
    }
  }
  _selected = -1;
  _pre = [];
  setInputRef = (ref) => {
    this._input = ref;
  }
  setPreRef = (i, ref) => {
    this._pre[i] = ref;
  }
  updatePreRef = () => {
    this._pre = this._pre.filter(pre => pre !== null);
  }
  clearSearch = (cb) => {
    this._selected = -1;
    this._pre = [];
    this.setState({
      searchWord: '',
      isFocused: false,
    }, cb);
  }
  handleChange = (e) => {
    if (e.target.value) {
      this.handleSearch(e.target.value);
    }
    else {
      this.props.dispatchSearchPreClear();
    }
    this.setState({
      searchWord: e.target.value,
      isFocused: true,
    });
  }
  handleSearch = debounce((query) => {
    this.props.dispatchSearchPre(query);
  }, 1000);
  handleClose = () => {
    this.setState({
      isFocused: false,
    });
  }
  handleFocus = () => {
    const { isFocused } = this.state;
    if (!isFocused && this._input) {
      this._input.focus();
    }
    this.setState({
      isFocused: true,
    });
  }
  handleBlur = () => {
    const { searchWord } = this.state;
    if (!searchWord) {
      this.setState({
        isFocused: false,
      });
    }
  }
  handleInputKeyDown = e => {
    const { len } = this.props.preState;
    if (e.keyCode === VK_UP) {
      e.preventDefault();
      this.handleUpdateSelected(len - 1);
    }
    else if (e.keyCode === VK_DOWN) {
      e.preventDefault();
      this.handleUpdateSelected(0);
    }
  }
  handlePreKeyDown = e => {
    const { _selected } = this;
    const len = this.props.preState.results.len + 1; // +1 for 'search for word...'
    switch (e.keyCode) {
      case VK_UP:
      case VK_LEFT: {
        e.preventDefault();
        if (_selected === 0) {
          this.handleUpdateSelected(len - 1);
        }
        else {
          this.handleUpdateSelected(_selected - 1);
        }
        break;
      }
      case VK_DOWN:
      case VK_RIGHT: {
        e.preventDefault();
        if (_selected === len - 1) {
          this.handleUpdateSelected(0);
        }
        else {
          this.handleUpdateSelected(_selected + 1);
        }
        break;
      }
      default:
        break;
    }
  };
  handleUpdateSelected = (selected) => {
    this._selected = selected;
    const pre = this._pre[selected];
    if (pre) {
      pre.focus();
    }
  }
  handleSearchEnter = (searchWord) => (e) => {
    if (e.key === 'Enter') {
      if (!searchWord) {
        return;
      }
      this.pushToSearch(searchWord);
    }
  }
  handleSearchClick = (searchWord) => () => {
    this.pushToSearch(searchWord);
  }
  handleUserEnter = (nickname) => (e) => {
    if (e.key === 'Enter') {
      this.pushToProfile(nickname);
    }
  }
  handleUserClick = (nickname) => () => {
    this.pushToProfile(nickname);
  }
  pushToProfile = (nickname) => {
    this.clearSearch(() => history.push(`/${nickname}`));
  }
  pushToSearch = (searchWord) => {
    this.clearSearch(() => history.push(`/search/?q=${searchWord}`));
  }
  render() {
    const { isFocused, searchWord } = this.state;
    const { preState } = this.props;
    const { results } = preState;
    return (
      <div>
        <Container>
          <IconWrapper>
            <SearchIcon size={20} onClick={this.handleFocus} />
          </IconWrapper>
          <Input
            innerRef={this.setInputRef}
            value={searchWord}
            isFocused={searchWord || isFocused}
            onKeyDown={this.handleInputKeyDown}
            onKeyPress={this.handleSearchEnter(searchWord)}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            placeholder="Search DEVLOG..."
          />
        </Container>
        <Popover anchorEl={this._input} open={isFocused && !!searchWord} handleClose={this.handleClose}>
          <ResultHeader
            innerRef={ref => this.setPreRef(0, ref)}
            onKeyDown={this.handlePreKeyDown}
            onKeyPress={this.handleSearchEnter(searchWord)}
            onClick={this.handleSearchClick(searchWord)}
            tabIndex="-1"
          >
            <IconWrapper>
              <SearchIcon size={20} />
            </IconWrapper>
            <span>{`Search for ${searchWord}...`}</span>
          </ResultHeader>
          {
            results.users.length > 0 && (
              <PreList>
                <ListHeader>Users</ListHeader>
                {results.users.map((user, i) => (
                  <li key={user._id}>
                    <ListItem
                      innerRef={ref => this.setPreRef(i + 1, ref)}
                      onKeyDown={this.handlePreKeyDown}
                      onKeyPress={this.handleUserEnter(user.nickname)}
                      onClick={this.handleUserClick(user.nickname)}
                      tabIndex="-1"
                    >
                      <Avatar size={32} />
                      <AvatarText>{user.nickname}</AvatarText>
                    </ListItem>
                  </li>
                ))}
              </PreList>
            )
          }
          {/* reulsts.tags ~~ */}
        </Popover>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  preState: state.search.pre,
});
const mapDispatchToProps = dispatch => ({
  dispatchSearchPre: (q) => dispatch(searchPre(q)),
  dispatchSearchPreClear: () => dispatch(searchPreClear()),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
