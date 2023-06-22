import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Card from '../Card/Card';
import { useState, useEffect} from 'react';
import { cutEmail } from '../../lib/api';
import '../Waiter/Waiter.css';
import { getProducts } from '../../lib/api';

function Waiter(){
    const [products, setProducts] = useState([]);
    const user = localStorage.getItem("user");
    const userInLine = cutEmail(user);
    const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const [find, setFind] = useState([]);

  useEffect(() => {
    getProducts(authorization).then((res) => {
      setProducts(res);
    });
  }, [authorization], getFind);
   
  function getFind(param){
        [...products].filter(e => e.name.toLowerCase().indexOf(param) !== -1)
  }
    return(
        <>
         <Banner />
         <Header user={userInLine} text='Mesera/o'/>
         <div className='containerButtons'>
        <Button text='Hacer pedido'/>
        <Button text='Entregas'/>
        </div>
        <div className='containerRoot'>
            <div className='columnA'>
            <Input
         value=''
        onChange={() => {getFind(products.name)}}
         className='input'
         textLabel='Busca tu producto:' />
                 <div className='productCards'>
                 {products.map((e) => {
              return (
                <Card
                  id={e.id}
                  img={e.image}
                  alt={e.name}
                  nameProduct={e.name}
                  price={e.price}
                />
              );
            })}
      </div>
            </div>
            <div className='columnB'> 
            <Input
         className='input'
         textLabel='Nombre Cliente:' />
            <p>HOLAAA</p>
            <p>HOLAAA</p>
            <p>HOLAAA</p>
            <p>HOLAAA</p>
            </div>
          </div>        
        </>
    )
}

export default Waiter;