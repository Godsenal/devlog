import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const Margined = styled.div`
  margin-bottom: 20px;
`;
const Field = ({ name, label, type, isValid, value, onChange, hasMessage, message, ...props }) => (
  <Margined>
    <TextField
      error={hasMessage && !isValid}
      type={type}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      helperText={hasMessage ? message : ''}
      {...props}
    />
  </Margined>
);

Field.propTypes = {
  hasMessage: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  message: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
};
Field.defaultProps = {
  type: 'text',
  isValid: true,
  hasMessage: false,
  message: null,
};

export default Field;
