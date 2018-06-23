import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SearchIcon from 'react-icons/lib/md/search';
import debounce from 'lodash/debounce';
import { searchPre } from '../../actions/search';

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
const Result = styled.div`
  position: absolute;
  left: 0;
  top: 20px;

  width: 200px;
`;
class SearchBar extends PureComponent {
  state = {
    searchWord: '',
    isFocused: false,
  }
  static propTypes = {
    dispatchSearchPre: PropTypes.func.isRequired,
    preState: PropTypes.object.isRequired,
  }
  setInputRef = (ref) => {
    this.input = ref;
  }
  handleChange = (e) => {
    if (e.target.value) {
      this.handleSearch(e.target.value);
    }
    this.setState({
      searchWord: e.target.value,
    });
  }
  handleSearch = debounce((query) => {
    this.props.dispatchSearchPre(query);
  }, 300);
  handleFocus = () => {
    const { isFocused } = this.state;
    if (!isFocused && this.input) {
      this.input.focus();
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
  render() {
    const { isFocused, searchWord } = this.state;
    const { preState } = this.props;
    return (
      <Container>
        <IconWrapper>
          <SearchIcon size={20} onClick={this.handleFocus} />
        </IconWrapper>
        <Input
          innerRef={this.setInputRef}
          value={searchWord}
          isFocused={isFocused}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          placeholder="Search DEVLOG..."
        />
        <Result>
          {
            preState.results.users && preState.results.users.map((user) => (
              <div key={user._id}>{user.nickname}</div>
            ))
          }
        </Result>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  preState: state.search.pre,
});
const mapDispatchToProps = dispatch => ({
  dispatchSearchPre: (q) => dispatch(searchPre(q)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
