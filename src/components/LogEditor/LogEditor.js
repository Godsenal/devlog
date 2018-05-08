import React, { Component } from 'react';
import Remarkable from 'remarkable';
import hljs from 'highlight.js';
import styled from 'styled-components';
import './index.css';

/* Markdown default setting */
const md = new Remarkable({
  langPrefix: 'language-',
  highlight: (str, lang) => {
    /*
      Need to try/catch.
      See this example https://codesandbox.io/s/mm73lwmnv9
    */
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value;
    }

    return hljs.highlightAuto(str).value;
  },
});
/* Editor Wrapper */
const Container = styled.div`
  width: 90%;

  margin: auto;
`;
/* Editor text area component */
const Editor = styled.textarea`
  width: 100%;

  min-height: 200px;
  
  padding: 1rem;
  
  background: white;
  
  outline: none;

  border-radius: 8px;
  border: 0;
`;

export default class LogEditor extends Component {
  state = {
    text: '',
  };
  handleChange = e => {
    this.setState({
      text: e.target.value,
    });
  };

  render() {
    const {
      text,
    } = this.state;
    return (
      <Container>
        <div>
          <Editor
            placeholder="Write your today logs!"
            onChange={this.handleChange}
            value={text}
          />
        </div>
        <h2>Preview</h2>
        <div
          dangerouslySetInnerHTML={{ __html: md.render(text) }}
        />
      </Container>
    );
  }
}
