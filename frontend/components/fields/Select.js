import React from "react";
import PropTypes from "prop-types";
import { createField, fieldPresets } from "react-advanced-form";

export class Select extends React.Component {
  static propTypes = {
    /* General */
    id: PropTypes.string,
    className: PropTypes.string,
    label: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string.isRequired,
    children: PropTypes.array,

    /* Inherited */
    fieldProps: PropTypes.object.isRequired,
    fieldState: PropTypes.object.isRequired
  };

  render() {
    const {
      fieldProps,
      fieldState,
      id,
      className,
      name,
      multiple,
      label
    } = this.props;

    const { errors } = fieldState;

    const selectClassNames = ["form-control", className]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="form-group">
        {label && (
          <label className="form__label" htmlFor={id || name}>
            {label}
          </label>
        )}

        <select
          id={id || name}
          multiple={multiple}
          className={selectClassNames}
          {...fieldProps}
        >
          {this.props.children}
        </select>
        {errors &&
          errors.map(err => (
            <div className="form__error" key={err}>
              {err}
            </div>
          ))}
      </div>
    );
  }
}

export default createField(fieldPresets.select)(Select);
