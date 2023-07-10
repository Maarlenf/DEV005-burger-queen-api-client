import { useState, useEffect } from "react";
import { getOrders, cutEmail, deleteOrder } from "../../lib/api";
import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineNoFood } from "react-icons/md";
import "./Orders.css";
import { TfiTimer } from "react-icons/tfi";
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Timer from "../Timer/Timer";

function Orders() {
  const navigate = useNavigate();

  const [filteredOrders, setFilteredOrders] = useState([]);

  console.log(filteredOrders);
  const [getOrdersStatus, setGetOrdersStatus] = useState("loading");

  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const user = localStorage.getItem("user");
  const userInLine = cutEmail(user);
  localStorage.setItem("userInLine", userInLine);

  useEffect(() => {
    getOrders(authorization)
      .then((res) => {
        console.log(res);
        setGetOrdersStatus("success");

        const filtered = res.filter((order) => {
          console.log(order);
          return order.status === "delivered";
        });
        setFilteredOrders(filtered);
      })
      .catch((error) => {
        setGetOrdersStatus("error");
      });
  }, []);
  function getTime(dateEntry, dateProcessed) {
    const inicio = new Date(dateEntry);
    const fin = new Date(dateProcessed);
    console.log(dateEntry, dateProcessed);
    let diff = fin - inicio;
    let h, m, s;
    h = Math.floor(diff / 1000 / 60 / 60);
    m = Math.floor((diff / 1000 / 60 / 60 - h) * 60);
    s = Math.floor(((diff / 1000 / 60 / 60 - h) * 60 - m) * 60);
    s < 10 ? (s = `0${s}`) : (s = `${s}`);
    m < 10 ? (m = `0${m}`) : (m = `${m}`);
    h < 10 ? (h = `0${h}`) : (h = `${h}`);

    return <span>{"Pasaron: " + h + ":" + m + ":" + s}</span>;
  }
  function deleteOrderId(id) {
    deleteOrder(id, authorization).then((res) => {
      let newList = [...filteredOrders];
      newList = newList.filter((i) => i.id !== id);
      setFilteredOrders(newList);
      res;
    });
  }
  function goToOrders() {
    return navigate("/waiter");
  }
  return (
    <>
      <Banner />
      <Header user={userInLine} text={"Mesero/Órdenes"} />
      <div className='containerButtons'>
        <Button id='btnGoToOrders' text={"Tomar Pedido"} onClick={goToOrders} />
      </div>
      {getOrdersStatus === "loading" ? (
        <p data-testid='loadingOrders'>Cargando...</p>
      ) : getOrdersStatus === "success" && filteredOrders.length === 0 ? (
        <p data-testid='successWithNothing'>Aún no hay pedidos</p>
      ) : getOrdersStatus === "success" ? (
        <div className='containerTableOrder' data-testid='tableOrders'>
          <div className='columns'>
            <span className='id'>Orden</span>
            <span className='email'>Detalle</span>
          </div>
          {filteredOrders.map((order) => {
            const childrenOfOrder = order.products.map((e) => {
              return (
                <ul key={order.id + "-" + e.product.id}>
                  <li>{e.qty}</li>
                  <img
                    src={e.product.image}
                    alt='img product'
                    style={{ width: "70px", height: "70px" }}
                  />
                  <li>{e.product.name}</li>
                </ul>
              );
            });
            return (
              <div key={order.id} className='containerOrders'>
                <div className='dataClient'>
                  <ul>
                    <div className='client'>
                      <AiOutlineUser size={25} />
                      <li>{order.client}</li>
                    </div>
                    <div className='timer'>
                      <TfiTimer size={25} />
                      {getTime(order.dateEntry, order.dateProcessed)}
                    </div>
                  </ul>
                </div>
                <div className='dataOrder'>
                  {childrenOfOrder}
                  <Button
                    id='btnUpdate'
                    text='Entregado'
                    onClick={() => deleteOrderId(order.id, order.status)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : getOrdersStatus === "error" ? (
        <p data-testid='ordersError'>Ha ocurrido un error</p>
      ) : null}

      {/* <Footer /> */}
    </>
  );
}

export default Orders;
