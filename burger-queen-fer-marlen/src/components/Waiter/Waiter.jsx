import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Input from "../Input/Input";
import Card from "../Card/Card";
import "../Waiter/Waiter.css";
import { useEffect, useState, useId } from "react";
import { createOrder, cutEmail } from "../../lib/api";
import { getProducts } from "../../lib/api";

function Waiter() {
  const [products, setProducts] = useState([]);
  const [find, setFind] = useState([]);
  const [search, setSearch] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  console.log(orderItems);
  // const [count, setCount] = useState(  localStorage.getItem("counter"););
  const quantityPr = localStorage.getItem("counter");
  const user = localStorage.getItem("user");
  const userInLine = cutEmail(user);
  localStorage.setItem("userInLine", userInLine);
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const now = [{ date: new Date() }];
  const idUser = useId();
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
    //const count= localStorage.getItem('counter');
    console.log(count);

    const existingItem = orderItems.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedItems = orderItems.map((item) => {
        if (item.id === product.id) {
          return { ...item, qty: count };
        }
        // if (item.qty === count) {
        //   return { ...item, qty: item.qty };
        // }
        return item;
      });
      setOrderItems(updatedItems);
    } else {
      const newItem = { ...product, qty: count };
      setOrderItems([...orderItems, newItem]);
    }
  }
  function handleSubmitOrder() {
    const objOrder = {
      userId: 35345,
      client: nameUser,
      products: orderItems.map((item) => {
        return {
          qty: item.qty,
          product: {
            id: item.id,
            name: item.name,
            prce: item.price,
            image: item.image,
            type: item.type,
            dataEntry: item.dataEntry,
          },
        };
      }),
      status: "pending",
      dateEntry: new Date(),
    };

    createOrder(authorization, objOrder)
      .then((res) => {
        console.log("orden creada", res);
      })
      .catch((err) => {
        console.log("error al crear la orden", err);
      });
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
                  product={e}
                  onAddToOrder={(product, count) =>
                    handleAddToOrder(product, count)
                  }
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
              <span className='timeOforder'>{now.date}</span>
              <span className='nameUser'>{nameUser}</span>
            </div>
            <div className='columnOrder'>
              <div className='columnHeader'>
                <span>Order</span>
              </div>
              <div className='containerOrder'>
                {orderItems.map((item) => (
                  <div key={item.id} className='orderItem'>
                    <span>{item.qty}</span>
                    <span>{item.name}</span>
                    <span>${item.price * item.qty}</span>
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
                <Button
                  text='Enviar a cocina'
                  id='btnSend'
                  onClick={handleSubmitOrder}
                />
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
