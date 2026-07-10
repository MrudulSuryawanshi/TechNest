import React from "react";
import "./InputField.css"

function InputField({
  label,
  type,
  id,
  placeholder,
  register,
  error,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id)}
      />

      {error && <p className="error">{error.message}</p>}
    </div>
  );
}

export default InputField;