function Input({ textLabel, className, type, id, placeholder, value, onChange}) {
  return (
    <>
      <label>
        <p className={className}>{textLabel}</p>
        <input
          type={type}
          className='input'
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default Input;
  

