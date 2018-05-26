import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BoxWrapper = styled.div`
  border-radius: 10px;
  ${props => `
    width: ${typeof props.width === 'string' ? props.width : `${props.width}px`};
    height: ${typeof props.height === 'string' ? props.height : `${props.height}px`};
  `}
`;

const CodeFrameBox = ({ type, src, width, height }) => {
  let Box = null;
  if (type === 'jsfiddle') {
    Box = (
      <iframe
        title="code-frame"
        src={src}
        width="100%"
        height="100%"
        allowFullScreen=""
        frameBorder="0"
      />
    );
  }
  else if (type === 'gist') {
    Box = <script src={src} />;
  }
  return (
    <BoxWrapper width={width} height={height}>
      {Box}
    </BoxWrapper>
  );
};

CodeFrameBox.propTypes = {
  height: PropTypes.any,
  src: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  width: PropTypes.any,
};
CodeFrameBox.defaultProps = {
  height: 200,
  width: '100%',
};

export default CodeFrameBox;
