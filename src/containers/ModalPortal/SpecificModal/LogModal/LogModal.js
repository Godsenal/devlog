import React from 'react';
import PropTypes from 'prop-types';
import { LogView } from '../../../../components';

const LogModal = ({ logId }) => (
  <LogView logId={logId} />
);
LogModal.propTypes = {
  logId: PropTypes.string.isRequired,
};

export default LogModal;
