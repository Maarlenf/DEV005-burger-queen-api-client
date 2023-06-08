function Button({id, type, text, onClick}){
    return(
        <>
         <button type={type} id={id} className='btn' onClick={onClick}>{text}</button>
        </>
    )
}

export default Button