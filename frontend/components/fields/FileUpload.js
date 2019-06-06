import React from "react";
import { createField } from "react-advanced-form";
import PropTypes from "prop-types";

class FieldInput extends React.Component {
  static propTypes = {
    formRef: PropTypes.object.isRequired,
    changeHandle: PropTypes.func.isRequired,
    fieldState: PropTypes.object,
    fieldProps: PropTypes.object,
    label: PropTypes.string.isRequired
  };

  handleChange = async event => {
    const { formRef } = this.props;
    const res = await this.props.changeHandle(event);
    formRef.current.setValues({ job__picture: res.image });
  };

  render() {
    const { fieldState, fieldProps, label } = this.props;
    // console.log("INPUT STATE", fieldState)
    return (
      <div className="form-group">
        {label && (
          <label className="form-control-label" htmlFor={fieldProps.name}>
            {label}
          </label>
        )}
        <input
          {...fieldProps}
          className="form-control"
          onChange={this.handleChange}
        />
        {fieldState.errors &&
          fieldState.errors.map(err => (
            <div className="formError" key={err}>
              {err}
            </div>
          ))}
      </div>
    );
  }
}

export default createField({
  valuePropName: "file",
  enforceProps: () => ({
    type: "file"
  })
})(FieldInput);
