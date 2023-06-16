function Input({ textLabel, className, type, id, placeholder, value, onChange}) {
  return (
    <>
     <label>
        <p className='p-login'>{textLabel}</p>
        <input
          type={type}
          className={className}
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
  

