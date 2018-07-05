import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import queryString from 'query-string';
import { listLog } from '../../actions/log';
import { searchTag } from '../../actions/search';
import { mainContainer } from '../../styles/util';
import { LogList, NoneStyleList, Tag, NotFound } from '../../components';

const Container = styled.div`
  ${mainContainer()}
  max-width: 860px;
`;
const MainHeader = styled.h1`
  
`;
const SubHeader = styled.h3`

`;
class TagPage extends Component {
  static propTypes = {
    dispatchListLog: PropTypes.func.isRequired,
    dispatchSearchTag: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    logState: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    tagState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { search } = this.props.location;
    const qs = this.getQueryString(search);
    if (qs) {
      const tags = this.pushToArray(qs);
      this.handleListLog(tags)({ skip: 0, tags });
      this.handleListTag(tags[0])({ skip: 0, limit: 5 });
    }
  }
  componentDidUpdate(prevProps) {
    const prevQs = this.getQueryString(prevProps.location.search);
    const qs = this.getQueryString(this.props.location.search);
    const prevTags = this.pushToArray(prevQs);
    const tags = this.pushToArray(qs);
    if (!this.compareArray(prevTags, tags)) {
      this.handleListLog(tags)({ skip: 0, tags });
      this.handleListTag(tags[0])({ skip: 0, limit: 5 });
    }
  }
  compareArray = (arr1, arr2) => {
    if (!arr1 || !arr2) {
      return false;
    }
    if (JSON.stringify(arr1.sort()) !== JSON.stringify(arr2.sort())) {
      return false;
    }
    return true;
  }
  getQueryString = (search) => {
    if (!search) {
      return false;
    }
    const { tags } = queryString.parse(search);
    return tags;
  }
  getNotInArray = (arr, standard) => arr.filter(item => standard.indexOf(item.name) === -1)
  pushToArray = (item) => {
    /* function for push string OR array to array */
    const arr = [];
    return arr.concat(item);
  }
  handleListLog = (tags) => (payload) => {
    this.props.dispatchListLog({ ...payload, tags });
  }
  handleListTag = (standard) => (payload) => {
    this.props.dispatchSearchTag({ ...payload, q: standard });
  }
  handleTagClick = (tag) => () => {
    const { history, location } = this.props;
    let url = location.pathname;
    if (location.search) {
      url = `${url + location.search}&tags=${tag}`;
    }
    else {
      url = `${url}?tags=${tag}`;
    }
    history.push(url);
  }
  render() {
    const { search } = this.props.location;
    const tag = this.getQueryString(search);
    if (!tag) {
      return <NotFound />;
    }
    const { logState, tagState } = this.props;
    const tags = this.pushToArray(tag);
    const relatedTags = this.getNotInArray(tagState.tags, tags);
    const showRelated = tagState.status === 'SUCCESS' && relatedTags.length > 0;
    return (
      <Container>
        <MainHeader>
          Tags: { tags.map((item, i) => <Tag key={i} name={item} />) }
        </MainHeader>
        { showRelated && (
          <React.Fragment>
            <SubHeader>Related Tags</SubHeader>
            <NoneStyleList>
              {
                relatedTags.map((item, i) => (
                  <Tag key={i} name={item.name} onClick={this.handleTagClick(item.name)} />
                ))
              }
            </NoneStyleList>
          </React.Fragment>
        )}
        <LogList
          {...logState}
          handleListLog={this.handleListLog(tags)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  logState: state.log.list,
  tagState: state.search.tag,
});

const mapDispatchToProps = dispatch => ({
  dispatchListLog: (payload) => dispatch(listLog(payload)),
  dispatchSearchTag: (payload) => dispatch(searchTag(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagPage);
