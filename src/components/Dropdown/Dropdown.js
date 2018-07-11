import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AngleDown from 'react-icons/lib/fa/angle-down';
import AngleUp from 'react-icons/lib/fa/angle-up';
import { shadow } from '../../styles/util';

const DropdownGroup = styled.div`
  position: relative;
  display: inline-block;
`;
const DropdownList = styled.ul`
  position: absolute;
  top: ${props => (props.upward ? '-320px' : '100%')};
  left: 0;
  z-index: 100;

  height: 300px;
  overflow-y: auto;

  background-color: white;

  border-radius: 5px;

  padding: 0;
  list-style-type: none;

  ${shadow()}
`;
const DropdownButton = styled.button`
  padding: 10px 5px;
  border: none;
  outline: none;

  cursor: pointer;
`;

export default class Dropdown extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selected: PropTypes.string.isRequired,
    upward: PropTypes.bool,
  }
  static defaultProps = {
    upward: false,
  }
  componentDidUpdate = (prevProps) => {
    if (prevProps.open !== this.props.open) {
      const { open } = this.props;
      if (open) {
        document.addEventListener('mousedown', this.checkClickOutside);
      }
      else {
        document.removeEventListener('mousedown', this.checkClickOutside);
      }
    }
  }
  setGroupRef = ref => (this._container = ref);
  checkClickOutside = (e) => {
    e.stopPropagation();
    if (this._container && !this._container.contains(e.target)) {
      this.props.handleClose();
    }
  }
  render() {
    const { children, selected, handleOpen, handleClose, open, upward } = this.props;
    return (
      <DropdownGroup innerRef={this.setGroupRef}>
        <DropdownButton onClick={open ? handleClose : handleOpen}>
          {selected}
          {open ? <AngleUp /> : <AngleDown />}
        </DropdownButton>
        {
          open && (
            <DropdownList upward={upward}>
              {children}
            </DropdownList>
          )
        }
      </DropdownGroup>
    );
  }
}
