import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import default_profile from '../../images/default_profile.png';

const Item = styled.div`
  position: relative;

  margin: 10px 0;
  padding: 10px;
  
  background-color: white;

  border-radius: 5px;

  cursor: pointer;

  &:hover {
    box-shadow: 3px 6px 16px rgba(0,0,0,.3);
    transition: box-shadow 0.1s ease-in;
  }
`;
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;

  border-radius: 50%;

  position: absolute;

  float: left;
`;
const Content = styled.div`
  margin-left: 50px;
`;
const Header = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
`;
const Author = styled.span`
  font-weight: 600;
`;
const Date = styled.span`
  color: #ccc;
  &::before {
    content: "\00b7";
  }
`;
const Text = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 20px;
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
      text,
      author_nickname,
      has_code,
      created,
    } = this.props;
    return (
      <Item>
        <ProfileImage src={default_profile} />
        <Content>
          <Header>
            <Author>{author_nickname}</Author>
            <Date>{moment(created).startOf('hour').fromNow()}</Date>
          </Header>
          <Text>{text}</Text>
          { has_code && (
            <CodePreview>
              <Icon name="code" /> Click To See Code
            </CodePreview>
          )}
        </Content>
      </Item>
    );
  }
}
