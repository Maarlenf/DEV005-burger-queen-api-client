function Button({ id, type, text }) {
  return (
    <>
      <button id={id} className='btn' type={type}>
        {text}
      </button>
    </>
  );
}

export default Button;
