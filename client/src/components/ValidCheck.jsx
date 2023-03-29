import React from 'react';

const ValidCheck = ({ isValid, message }) => {
  return <>{!isValid && <p className="error">{message}</p>}</>;
};

export default ValidCheck;
