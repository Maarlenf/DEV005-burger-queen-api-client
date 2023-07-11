import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Card from "../Card/Card";
import "../Waiter/Waiter.css";
import { useEffect, useState , useId, } from "react";
import { useNavigate } from 'react-router-dom';
import { createOrder, cutEmail } from "../../lib/api";
import { getProducts, getOrders } from "../../lib/api";
import {MdOutlineNoFood} from "react-icons/md";


function Waiter() {
  const [products, setProducts] = useState([]);
  const [find, setFind] = useState([]);
  const [search, setSearch] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const user = localStorage.getItem("user");
  const userInLine = cutEmail(user);
  localStorage.setItem("userInLine", userInLine);
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const idUser = useId();
  const navigate = useNavigate();
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [delivered, setDelivered] = useState([]);
  
  
  useEffect(() => {
    getProducts(authorization).then((res) => {
      setProducts(res);
      // console.log(res);
      setFind(res);
    });
  }, [authorization]);

  useEffect(() => {
    getFind(search);
  }, [search]);

  function getFind(param) {
    if (param) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(param.toLowerCase())
      );
      setFind(filteredProducts);
    } else {
      setFind(products);
    }
  }

  function handleAddToOrder(product, count) {

    const existingItem = orderItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = orderItems.map((item) => {
        
        if (item.id === product.id) {
          return {...item, qty: count, };
         }//  if(item.qty === count){
        //   return {...item, qty: item.qty}
        // }
       return item;
      });
      setOrderItems(updatedItems);
    } else {
      const newItem = { ...product, qty: count };
      setOrderItems([...orderItems, newItem]);
    }
  }


  const product = orderItems.map((x) => {
    return { qty: x.qty,
     product: {
       id: x.id,
       name: x.name,
       price: x.price,
       image: x.image,
       type: x.type,
       dateEntry: x.dateEntry
     }
   }
   });
  const objectOrder = {
    userId: idUser,
    client: nameUser,
    products: product,
    status: "pending",
    dateEntry: new Date()
  }

function addOrder(){
  createOrder(authorization, objectOrder)
  .then((res) => {
    res
    setOrderItems([]);
    setNameUser('');
  })
}
// function filter(param) {
//   if (selectedTypes.includes(param)) {
//     // El tipo ya se selccionó, se tiene  que remover
//     setSelectedTypes(selectedTypes.filter((type) => type !== param));
//   } else {
//     // El tipo no estaba seleccionado, se tiene que agregar
//     setSelectedTypes([...selectedTypes, param]);
//   }
// }

function deleteItem(item){
 let newArray = [...orderItems];
  newArray = newArray.filter(i => {return i.name !== item.name});
  setOrderItems(newArray);
}

function goToOrders(){
  navigate('/waiter/orders')
}

useEffect(() => {
  getOrders(authorization)
  .then((res) => {
    // console.log(res);
    const listWithStatusDelivered = [...res].filter(
      (e) => e.status === "delivered"
    )
    setDelivered(listWithStatusDelivered);
  })
},[]);
 
  

  return (
    <>
   
      <Banner></Banner>
      <Header user={userInLine} text={"Mesero/a"} />
      <div className='containerButtons'>
        {/* <Button text={"Hacer Pedido"} /> */}
        {delivered.length !== 0 ? (<Button text={delivered.length + " Entregas"} onClick={goToOrders} id='goToOrders'/>):null}
       
      </div>
      <div className='containerRoot'>
        <div className='columnA'>
          <Input
            className='input'
            textLabel='Busca tu producto:'
            value={search}
            id="inputForSearch"
            onChange={(event) => setSearch(event.target.value)}
          />
          {/* <div className='containerOptions'>
          <div className='optionDes'>
            <span>Desayuno</span>
            <Input
              type='checkbox'
              id='desTopping'
              value='Desayuno'
              checked={selectedTypes.includes("Desayuno")}
              onChange={(e) => filter(e.target.value)}
            />
          </div>
          <div className='optionAlm'>
            <span>Almuerzo</span>
            <Input
              type='checkbox'
              name='Almuerzo'
              id='almTopping'
              value='Almuerzo'
              checked={selectedTypes.includes("Almuerzo")}
              onChange={(e) => filter(e.target.value)}
            />
          </div>
          <div className='optionCen'>
            <span>Cena</span>
            <Input
              type='checkbox'
              id='cenTopping'
              value='Cena'
              checked={selectedTypes.includes("Cena")}
              onChange={(e) => filter(e.target.value)}
            />
          </div>
        </div> */}
          <div className='productCards' data-testid='tableWaiter'>
            {
            find
            .filter((product) =>
              selectedTypes.length === 0
                ? true
                : selectedTypes.includes(product.type)
            )
            .map((e) => {
              return (
                <Card
                  key={e.id}
                  id={e.id}
                  img={e.image}
                  alt={e.name}
                  nameProduct={e.name}
                  price={e.price}
                  textBtn={"Agregar"}
                  product={e}
                  onAddToOrder={(product, count) => handleAddToOrder(product, count)}
                />
              );
            })}
          </div>
        </div>
        <div className='columnB'>
          <Input
            className='input'
            textLabel='Nombre Cliente:'
            id="nameClient"
            value={nameUser}
            onChange={(event) => setNameUser(event.target.value)}
          />
          <div className='tableOrder'>
            <div className='columnOrder'>
              <div className='columnHeader'>
                <span>Order</span>
              </div>
              <div className="containerOrder">
                {orderItems.map((item) => (
                  <div key={item.id} className='orderItem'>
                    <span >{item.qty}</span>
                    <span >{item.name}</span>
                    <span >${item.price * item.qty}</span>
                    <MdOutlineNoFood
                      size={30}
                      style={{color:"red"}}
                      id="deleteItemOrder"
                      onClick={() => deleteItem(item)}
                    />
                  </div>
                ))}
              </div>
              <div className='total'>
               <div className='containerTotal'>
                <span>Total:</span>
                <span>
                  $
                  {orderItems.reduce(
                    (total, item) => total + item.price * item.qty,
                    0
                  )}
                </span>
                </div>
                <Button text='Enviar a cocina' id='btnSend' onClick={addOrder}/>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Waiter;
