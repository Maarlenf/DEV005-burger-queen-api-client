function Button({ id, type, text, onClick }) {
  return (
    <>
      <button id={id} className='btn' type={type} onClick={onClick}>
        {text}
      </button>
    </>
  );
}

export default Button;
