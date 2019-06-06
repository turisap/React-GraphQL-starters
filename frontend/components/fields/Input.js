import React from "react";
import { createField, fieldPresets } from "react-advanced-form";
/* eslint-disable */
const Input = props => {
  /**
   * "fieldProps" need to be mapped to the field element.
   * "fieldState" contains the current state of a field.
   */
  const { fieldProps, fieldState, label } = props;
  const {  errors } = fieldState;

  return (
    <div className="input">
      {label && (
        <label className="form-control-label" htmlFor={null || fieldProps.name}>
          {label}
        </label>
      )}
      {/* Propagating "fieldProps" is crucial to register a field */}
      <input {...fieldProps} />

      {/* Render input errors underneath */}
      { errors &&
        errors.map(error => <div className="formError" key={error}>{error}</div>)}

    </div>
  );
};

export default createField(fieldPresets.input)(Input);
/* eslint-enable */
