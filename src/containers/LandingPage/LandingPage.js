import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import lottie from 'lottie-web';
import Button from '@material-ui/core/Button';
import geek from '../../data/spirit_geek.json';

const Container = styled.div`
  display: flex;
`;
const MainContent = styled.div`
  opacity: ${props => (props.isMounted ? 1 : 0)};
  transform: ${props => (props.isMounted ? 'translateY(-20px)' : 'translateY(0px)')};
  transition: opacity 0.8s ease, transform 0.8s ease;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
`;
const LottieContainer = styled.div`
  width: 200px;
`;
const Hero = styled.h1`
  font-size: 56px;
  font-weight: 600;
  margin: 0;
  color: rgba(0, 0, 0, 0.64);
`;
const SubHero = styled.h2`
  font-size: 36px;
  color: rgba(0, 0, 0, 0.64);
`;
const MarginRight = styled.span`
  margin-right: 10px;
`;
export default class LandingPage extends Component {
  state = {
    isMounted: false,
  }
  static propTypes = {
    showModal: PropTypes.func.isRequired,
  }
  componentDidMount() {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (this._shouldMount) {
          this.setState({
            isMounted: true,
          });
        }
      });
    });
    if (this._lottieContainer) {
      this._lottie = lottie.loadAnimation({
        container: this._lottieContainer, // the dom element that will contain the animation
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: geek, // the path to the animation json
      });
    }
  }
  componentWillUnmount() {
    this._shouldMount = false;
  }
  _shouldMount = true;
  setLottieRef = (ref) => {
    this._lottieContainer = ref;
  }
  handleModal = (type) => () => {
    this.props.showModal(type);
  }
  render() {
    const { isMounted } = this.state;
    return (
      <Container>
        <MainContent isMounted={isMounted}>
          <Hero>
            <LottieContainer innerRef={this.setLottieRef} />
          </Hero>
          <Hero>
            DEVLOG
          </Hero>
          <SubHero>
            Daily code log
          </SubHero>
          <div>
            <MarginRight >
              <Button
                onClick={this.handleModal('LOGIN_MODAL')}
                variant="outlined"
                color="primary"
                size="large"
              >
                Login
              </Button>
            </MarginRight>
            <Button onClick={this.handleModal('SIGNUP_MODAL')} variant="outlined" size="large">Signup</Button>
          </div>
        </MainContent>
      </Container>
    );
  }
}
