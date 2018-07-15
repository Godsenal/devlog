import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CodeIcon from 'react-icons/lib/fa/code';
import { Link } from 'react-router-dom';
import { MainContent, LogViewToolBox } from '../';
import { listItem } from '../../styles/util';

const Item = styled(Link)`
  display: block;
  position: relative;

  ${listItem()}
  padding: 10px;
  
  color: black;
  background-color: white;

  text-decoration: none;
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

  color: white;
  background-color: black;

  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-left: 10px;
  }
`;
export default class LogListItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
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
      author,
      comment_count,
      has_code,
      created,
      stars,
    } = this.props;
    return (
      <Item to={{ pathname: `/@${author.nickname}/log/${_id}`, state: { modal: true } }}>
        <MainContent
          author={author}
          text={text}
          created={created}
        >
          { has_code && (
            <CodePreview>
              <CodeIcon /> <span>Click to see code</span>
            </CodePreview>
          )}
        </MainContent>
        <LogViewToolBox logId={_id} stars={stars} commentCount={comment_count} />
      </Item>
    );
  }
}
