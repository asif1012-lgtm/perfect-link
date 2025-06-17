import React from 'react';

function FormInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  pattern,
  title
}) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern}
        title={title}
        required={required}
        className={`form-input ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default FormInput;