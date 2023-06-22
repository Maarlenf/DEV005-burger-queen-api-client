import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";
import "../Card/Card.css";

function Card({ img, alt, nameProduct, price }) {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className='card'>
        <img src={img} alt={`image ${alt}`} />
        <span>{nameProduct}</span>
        <span className="price">{`$${price}`}</span>
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
      </div>
    </>
  );
}

export default Card;
