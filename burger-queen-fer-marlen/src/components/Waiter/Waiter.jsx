import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Card from "../Card/Card";
import "../Waiter/Waiter.css";
import { useEffect, useState } from "react";
import { cutEmail } from "../../lib/api";
import { getProducts } from "../../lib/api";

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

  useEffect(() => {
    getProducts(authorization).then((res) => {
      setProducts(res);
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
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      setOrderItems(updatedItems);
    } else {
      const newItem = { ...product, quantity: 1 };
      setOrderItems([...orderItems, newItem]);
    }
  }

  return (
    <>
      <Banner></Banner>
      <Header user={userInLine} text={"Mesero/a"} />
      <div className='containerButtons'>
        <Button text={"Hacer Pedido"} />
        <Button text={"Entregas"} />
      </div>
      <div className='containerRoot'>
        <div className='columnA'>
          <Input
            className='input'
            textLabel='Busca tu producto:'
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className='productCards'>
            {find.map((e) => {
              return (
                <Card
                  key={e.id}
                  id={e.id}
                  img={e.image}
                  alt={e.name}
                  nameProduct={e.name}
                  price={e.price}
                  textBtn={"Agregar"}
                  onAddToOrder={() => handleAddToOrder(e)}
                />
              );
            })}
          </div>
        </div>
        <div className='columnB'>
          <Input
            className='input'
            textLabel='Nombre Cliente:'
            onChange={(event) => setNameUser(event.target.value)}
          />
          <div className='tableOrder'>
            <div className='columnName'>
              <div className='columnHeader'>
                <span>Name</span>
              </div>
              <span className='nameUser'>{nameUser}</span>
            </div>
            <div className='columnOrder'>
              <div className='columnHeader'>
                <span>Order</span>
              </div>
              <div>
                {orderItems.map((item) => (
                  <div key={item.id} className='orderItem'>
                    <span>{item.name}</span>
                    <span>{item.quantity}</span>
                    <span>X</span>
                    <span>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className='total'>
                <span>Total:</span>
                <span>
                  $
                  {orderItems.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Waiter;
