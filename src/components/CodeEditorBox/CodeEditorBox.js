import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';

import 'brace/theme/monokai';

const BoxWrapper = styled.div`
  border-radius: 10px;
  ${props => `
    width: ${typeof props.width === 'string' ? props.width : `${props.width}px`};
    min-height: ${typeof props.height === 'string' ? props.height : `${props.height}px`};
  `}
`;
class CodeEditorBox extends Component {
  state = {
    languageLoaded: false,
  }
  static propTypes = {
    code: PropTypes.string.isRequired,
    height: PropTypes.any,
    language: PropTypes.string.isRequired,
    width: PropTypes.any,
  };
  static defaultProps = {
    height: 200,
    width: '100%',
  };
  componentDidMount() {
    const { language } = this.props;
    this.abortLoading = false;
    this.loadLanguage(language);
  }
  componentWillUnmount() {
    this.abortLoading = true;
  }
  loadLanguage = async (language) => {
    try {
      await import(`brace/mode/${language}`);
      if (!this.abortLoading) {
        this.setState(state => ({
          languageLoaded: !state.languageLoaded,
        }));
      }
    }
    catch (err) {
      // Error Handling
    }
  }
  render() {
    const { languageLoaded } = this.state;
    const { code, language, width, height } = this.props;
    return (
      <BoxWrapper width={width} height={height}>
        <AceEditor
          width="100%"
          height="100%"
          minLines={20}
          maxLines={50}
          value={code}
          mode={languageLoaded ? language : 'javascript'}
          theme="monokai"
          name="editor_code_block"
          editorProps={{ $blockScrolling: true }}
          highlightActiveLine={false}
          showPrintMargin={false}
          showGutter={false}
          readOnly
          setOptions={{
            fontFamily: "Ubuntu Mono",
            fontSize: "16px"
          }}
        />
      </BoxWrapper>
    );
  }
}


export default CodeEditorBox;
