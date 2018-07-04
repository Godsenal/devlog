import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import findIndex from 'lodash/findIndex';
import AngleDownIcon from 'react-icons/lib/fa/angle-down';
import ActionTag from './ActionTag';
import { Input, NoneStyleList, IconButton } from '../../../../components';
import { searchTag } from '../../../../actions/search';
import { addToast } from '../../../../actions/toast';

const Header = styled.h3`
  color: #555;
  font-size: 14px;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
class TagModal extends PureComponent {
  state = {
    searchWord: '',
    selectedTags: this.props.selectedTags,
  }
  static propTypes = {
    dispatchAddToast: PropTypes.func.isRequired,
    dispatchSearchTag: PropTypes.func.isRequired,
    handleTagChange: PropTypes.func.isRequired,
    searchState: PropTypes.object.isRequired,
    selectedTags: PropTypes.array.isRequired,
  }
  componentDidUpdate(prevState) {
    if (prevState.selectedTags !== this.state.selectedTags) {
      this.props.handleTagChange(this.state.selectedTags);
    }
  }
  validateTag = (tag) => {
    const tagReg = /^[a-zA-Z0-9]{2,10}$/g;
    if (tag.length < 2) {
      return false;
    }
    if (!tagReg.test(tag)) {
      return false;
    }
    return true;
  }
  handleInputChange = (e) => {
    const q = e.target.value;
    this.handleSearchTag({ q });
    this.setState({
      searchWord: q,
    });
  }
  handleKeyPress = (e) => {
    if (e.key === ',') {
      e.preventDefault();
      this.handleSelectTag(this.state.searchWord, true)();
    }
  }
  handleSelectTag = (selected, init = false) => () => {
    /* if init = true, reset searchWord */
    /* when user add tag without search, init will be triggered */
    /* tag validation */
    const { dispatchAddToast } = this.props;
    if (!this.validateTag(selected)) {
      dispatchAddToast({ message: 'tag must be at least two characters with out special characters', type: 'error' });
      return;
    }
    if (findIndex(this.state.selectedTags, name => name === selected) >= 0) {
      dispatchAddToast({ message: 'selected tag already exist', type: 'error' });
      return;
    }
    if (this.state.selectedTags.length >= 5) {
      dispatchAddToast({ message: 'You can choose tags up to 5', type: 'error' });
      return;
    }
    this.setState(state => ({
      selectedTags: [...state.selectedTags, selected],
      searchWord: init ? '' : state.searchWord,
    }));
  }
  handleRemoveTag = (selected) => () => {
    this.setState(state => ({
      selectedTags: state.selectedTags.filter(tag => tag !== selected),
    }));
  }
  handleListTag = ({ q, skip }) => {
    this.props.dispatchSearchTag({ q, skip });
  }
  handleSearchTag = debounce(({ q, skip }) => {
    this.handleListTag({ q, skip });
  }, 1000);
  render() {
    const { searchWord, selectedTags } = this.state;
    const { searchState } = this.props;
    return (
      <div>
        {
          selectedTags.length > 0 && (
            <NoneStyleList>
              <Header>Your Selection</Header>
              {
                selectedTags.map((tag, i) => (
                  <ActionTag key={i} type="remove" onClick={this.handleRemoveTag(tag)}>{tag}</ActionTag>
                ))
              }
            </NoneStyleList>
          )
        }
        <Header>Find tags you want :)</Header>
        <Input
          value={searchWord}
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          fontSize="1em"
          placeholder="Javascript..?"
        />
        {
          searchWord.length > 0 && (
            <NoneStyleList>
              {
                /* when input tag is not selected && is not item of result */
                findIndex(selectedTags, name => name === searchWord) < 0 &&
                findIndex(searchState.tags, tag => tag.name === searchWord) < 0 && (
                  <ActionTag type="add" onClick={this.handleSelectTag(searchWord, true)}>
                    Add '{searchWord}'
                  </ActionTag>
                )
              }
              {
                searchState.tags.map((tag, i) => {
                  if (findIndex(selectedTags, name => name === tag.name) >= 0) {
                    return null;
                  }
                  return <ActionTag key={i} type="add" onClick={this.handleSelectTag(tag.name)}>{tag.name}</ActionTag>;
                })
              }
              {
                searchState.tags.length > 0 && !searchState.isLast && (
                  <IconWrapper>
                    <IconButton onClick={() => this.handleListTag({ q: searchWord, skip: searchState.tags.length })}>
                      <AngleDownIcon />
                    </IconButton>
                  </IconWrapper>
                )
              }
            </NoneStyleList>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchState: state.search.tag,
});
const mapDispatchToProps = dispatch => ({
  dispatchSearchTag: payload => dispatch(searchTag(payload)),
  dispatchAddToast: toastProps => dispatch(addToast(toastProps)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagModal);
