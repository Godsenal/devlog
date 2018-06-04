import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { LogMainContent } from '../';

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
  text-align: center;
`;
export default class LogListItem extends Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    author_nickname: PropTypes.string.isRequired,
    created: PropTypes.string.isRequired,
    has_code: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }
  render() {
    const {
      _id,
      text,
      author_nickname,
      has_code,
      created,
    } = this.props;
    return (
      <Item to={{ pathname: `${author_nickname}/log/${_id}`, state: { modal: true } }}>
        <LogMainContent
          author_nickname={author_nickname}
          text={text}
          created={created}
        >
          { has_code && (
            <CodePreview>
              <Icon name="code" /> Click To See Code
            </CodePreview>
          )}
        </LogMainContent>
      </Item>
    );
  }
}
