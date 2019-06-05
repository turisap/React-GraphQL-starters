import React from "react";
import { createField, fieldPresets } from "react-advanced-form";
/* eslint-disable */
const Input = props => {
  /**
   * "fieldProps" need to be mapped to the field element.
   * "fieldState" contains the current state of a field.
   */
  const { fieldProps, fieldState } = props;
  const { touched, errors } = fieldState;

  return (
    <div className="input">
      {/* Propagating "fieldProps" is crucial to register a field */}
      <input {...fieldProps} />

      {/* Render input errors underneath */}
      {touched &&
        errors &&
        errors.map((error, i) => <div className="formError" key={i}>{error}</div>)}
    </div>
  );
};

export default createField(fieldPresets.input)(Input);
/* eslint-enable */
