import React from 'react';
import PropTypes from 'prop-types';
import { Form, Message, Icon } from 'semantic-ui-react';

const Field = ({ name, label, type, isValid, value, onChange, hasMessage, loading, message }) => (
  <Form.Field>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
    {
      hasMessage ?
        <Message visible success={isValid} error={!isValid} >
          {loading ? <Icon name="circle notched" loading /> : null}
          {message}
        </Message> : null
    }
  </Form.Field>
);

Field.propTypes = {
  hasMessage: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool,
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
  loading: false,
};

export default Field;
