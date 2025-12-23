import React from 'react';

const StickySOS = () => {
  return (
    <div className="sticky-sos d-block d-lg-none">
      <button className="btn btn-danger btn-lg rounded-circle p-4 btn-sos-pulse shadow-lg">
        <i className="fas fa-exclamation-triangle fa-2x"></i>
      </button>
    </div>
  );
};

export default StickySOS;