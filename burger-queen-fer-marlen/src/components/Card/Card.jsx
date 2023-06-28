import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import "../Card/Card.css";
import Button from "../Button/Button";

function Card({ id, img, alt, nameProduct, price, textBtn, onAddToOrder, product }) {
  const [count, setCount] = useState(0);
//  localStorage.setItem('counter', count);
  return (
    <>
      <div className='card' id={id}>
        <img src={img} alt={`image ${alt}`} />
        <span>{nameProduct}</span>
        <span>{`$${price}`}</span>
        <div className='counter'>
          <AiOutlineMinus
            size={25}
            id='minus'
            onClick={() => {
              setCount(count - 1);
            }}
          />
          <span>{count}</span>
          <AiOutlinePlus
            size={25}
            id='plus'
            onClick={() => {
              setCount(count + 1);
            }}
          />
        </div>
        <Button id='btnOrder' text={textBtn} onClick={() => onAddToOrder(product, count)} />
      </div>
    </>
  );
}

export default Card;
