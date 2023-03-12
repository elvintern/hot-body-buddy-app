import React from 'react';

export default function ValidCheck(props) {
  const { isValid, message } = props;

  return <>{!isValid ? <p className="error">{message}</p> : null}</>;
}
