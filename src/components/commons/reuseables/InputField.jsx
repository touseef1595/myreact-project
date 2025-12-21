import React from 'react'

const InputField = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-5 text-left ${className}`}>
      {label && (
        <label className="block mb-2 font-semibold text-gray-800 text-sm">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`input-field ${error ? 'error' : ''} ${success ? 'success' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  )
}

export default InputField