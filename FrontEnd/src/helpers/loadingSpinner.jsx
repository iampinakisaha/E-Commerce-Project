import React from 'react';
import PropTypes from 'prop-types';

const LoadingSpinner = ({ size = 10, position = 'absolute', bottom = 'bottom-0', top = 'top-0' }) => {
  const spinnerSize = `w-${size} h-${size}`;
  const spinnerClasses = `spinner-border animate-spin inline-block ${spinnerSize} border-4 rounded-full border-t-transparent border-slate-800`;

  return (
    <div className={`${position} ${bottom} ${top} left-0 right-0 flex items-center justify-center`}>
      <div className={spinnerClasses} role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.number,
  position: PropTypes.string,
  bottom: PropTypes.string,
  top: PropTypes.string,
};

export default LoadingSpinner;
