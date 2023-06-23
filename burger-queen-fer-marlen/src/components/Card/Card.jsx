import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import "../Card/Card.css";
import Button from "../Button/Button";

function Card({ id, img, alt, nameProduct, price, textBtn, onAddToOrder }) {
  const [count, setCount] = useState(0);
  localStorage.setItem('counter', count);
  return (
    <>
      <div className='card' id={id}>
        <img src={img} alt={`image ${alt}`} />
        <span>{nameProduct}</span>
        <span>{`$${price}`}</span>
        <div className='counter'>
          <AiOutlineMinus
            size={25}
            onClick={() => {
              setCount(count - 1);
            }}
          />
          <span>{count}</span>
          <AiOutlinePlus
            size={25}
            onClick={() => {
              setCount(count + 1);
            }}
          />
        </div>
        <Button id='btnOrder' text={textBtn} onClick={onAddToOrder} />
      </div>
    </>
  );
}

export default Card;
