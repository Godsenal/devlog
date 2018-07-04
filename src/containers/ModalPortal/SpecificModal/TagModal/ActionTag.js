import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import MinusIcon from 'react-icons/lib/fa/minus-square';
import PlusIcon from 'react-icons/lib/fa/plus-square';
import { defaultTag } from '../../../../styles/util';

const Pointer = styled.span`
  cursor: pointer;
`;
const IconWrapper = styled.span`
  color: ${props => (props.remove ? red[500] : green[500])};
  background-color: inherit;
  vertical-align: middle;

  margin-left: 5px;
`;
const Tag = styled.li`
  ${defaultTag}
`;
export default class ActionTag extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(['add', 'remove']),
  }

  render() {
    const { children, type } = this.props;
    let Icon = PlusIcon;
    if (type === 'remove') {
      Icon = MinusIcon;
    }
    return (
      <Pointer>
        <Tag {...this.props}>
          {children}
          <IconWrapper remove={type === 'remove'}>
            <Icon />
          </IconWrapper>
        </Tag>
      </Pointer>
    );
  }
}
