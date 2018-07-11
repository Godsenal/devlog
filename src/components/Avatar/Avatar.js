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

  opacity: ${props => (props.loaded ? 1 : 0)};
`;

export default class Avatar extends PureComponent {
  state = {
    loaded: false,
  }
  static propTypes = {
    size: PropTypes.number,
    src: PropTypes.string,
  }
  static defaultProps = {
    size: 36,
    src: default_profile,
  }
  handleImageLoad = () => {
    this.setState({
      loaded: true,
    });
  }
  setImageRef = ref => {
    this._image = ref;
  }
  render() {
    const { loaded } = this.state;
    const { size, src } = this.props;
    return (
      <AvatarImg
        loaded={loaded}
        innerRef={this.setImageRef}
        src={src}
        imgSize={size}
        alt="avatar_image"
        onLoad={this.handleImageLoad}
        {...this.props}
      />
    );
  }
}
