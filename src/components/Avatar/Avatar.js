import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import default_profile from '../../images/default_profile.png';

const AvatarImg = styled.img`
  ${props => (`
    width: ${props.imgSize}px;
    height: ${props.imgSize}px;
  `)}

  border-radius: 50%;
  
  flex: 0 0;
`;

export default class Avatar extends PureComponent {
  static propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
  }
  static defaultProps = {
    size: 36,
    src: default_profile,
  }
  render() {
    const { size, src } = this.props;
    return (
      <AvatarImg src={src} imgSize={size} />
    );
  }
}
