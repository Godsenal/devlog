import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CodeIcon from 'react-icons/lib/fa/code';
import { Link } from 'react-router-dom';
import { LogMainContent, LogViewToolBox } from '../';

const Item = styled(Link)`
  display: block;
  position: relative;

  margin: 10px 0;
  padding: 10px;
  
  color: black;
  background-color: white;

  border-radius: 5px;

  cursor: pointer;

  &:hover {
    color: black;
    box-shadow: 3px 6px 16px rgba(0,0,0,.3);
    transition: box-shadow 0.1s ease-in;
  }
`;
const CodePreview = styled.div`
  margin-top: 10px;
  padding: 10px;

  color: #F8F8F2;
  background-color: #272822;
  
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export default class LogListItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    author_id: PropTypes.string.isRequired,
    author_nickname: PropTypes.string.isRequired,
    comment_count: PropTypes.number.isRequired,
    created: PropTypes.string.isRequired,
    has_code: PropTypes.bool.isRequired,
    stars: PropTypes.array.isRequired,
    text: PropTypes.string.isRequired,
  }
  render() {
    const {
      _id,
      text,
      author_id,
      author_nickname,
      comment_count,
      has_code,
      created,
      stars,
    } = this.props;
    return (
      <Item to={{ pathname: `${author_nickname}/log/${_id}`, state: { modal: true } }}>
        <LogMainContent
          author_id={author_id}
          author_nickname={author_nickname}
          text={text}
          created={created}
        >
          { has_code && (
            <CodePreview>
              <CodeIcon /><span> Click to see code</span>
            </CodePreview>
          )}
        </LogMainContent>
        <LogViewToolBox logId={_id} stars={stars} commentCount={comment_count} />
      </Item>
    );
  }
}
