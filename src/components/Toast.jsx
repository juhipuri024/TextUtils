import React from 'react';
import PropTypes from 'prop-types';

export default function Toast({ toast }) {
  if (!toast || !toast.show) return null;

  return (
    <div className="toast-floating" role="alert" aria-live="assertive">
      <i className={`bi ${toast.icon || 'bi-check-circle-fill'} fs-5`} style={{ color: 'var(--primary)' }}></i>
      <span>{toast.message}</span>
    </div>
  );
}

Toast.propTypes = {
  toast: PropTypes.shape({
    show: PropTypes.bool,
    message: PropTypes.string,
    icon: PropTypes.string
  })
};
