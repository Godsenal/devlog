import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Text = styled.textarea`
  width: 100%;
  line-height: ${props => props.lineHeight}px;
  font-size: 16px;
  outline: none;

  border: 1px solid rgba(0,0,0,.1);
  border-radius: 5px;

  padding: 7px 10px;

  resize: none;
`;
export default class Textarea extends PureComponent {
  state = {
    rows: 1,
  }
  static propTypes = {
    lineHeight: PropTypes.number,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }
  static defaultProps = {
    lineHeight: 18,
  }
  handleChange = (e) => {
    e.persist();
    const oldRows = e.target.rows;
    e.target.rows = 1;
    const newRows = Math.floor(e.target.scrollHeight / this.props.lineHeight);
    if (newRows === oldRows) {
      e.target.rows = newRows;
    }
    this.setState({
      rows: newRows,
    });
    this.props.onChange(e);
  }
  render() {
    const { value, lineHeight } = this.props;
    const { rows } = this.state;
    return (
      <Text
        {...this.props}
        value={value}
        rows={rows}
        lineHeight={lineHeight}
        onChange={this.handleChange}
      />
    );
  }
}
