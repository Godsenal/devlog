import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TabContainer = styled.div`
  width: 100%;
  font-size: 16px;
`;
const TabList = styled.div`
  display: flex;
  align-items: center;
  ${props => props.centered && 'justify-content: center'};
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(0,0,0,.05);

  overflow-x: auto;
  overflow-y: hidden;
`;
const Tab = styled.span`
  cursor: pointer;
  
  margin-right: 15px;
  ${props => !props.selected && 'color: rgba(0, 0, 0, 0.5)'}
`;
export default class Tabs extends PureComponent {
  static propTypes = {
    centered: PropTypes.bool,
    children: PropTypes.node.isRequired,
    handleTabChange: PropTypes.func.isRequired,
    selected: PropTypes.number.isRequired,
  }
  static defaultProps = {
    centered: false,
  }
  handleTabChange = (i) => (e) => {
    const event = e;
    this.props.handleTabChange(event, i);
  }
  render() {
    const { children, selected, centered } = this.props;
    return (
      <TabContainer>
        <TabList centered={centered}>
          {
            React.Children.map(children, (child, i) => (
              <Tab selected={selected === i} onClick={this.handleTabChange(i)}>
                {child}
              </Tab>
            ))
          }
        </TabList>
      </TabContainer>
    );
  }
}
