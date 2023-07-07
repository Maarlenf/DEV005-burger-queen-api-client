import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cutEmail, getOrders, updateOrder } from "../../lib/api";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { TfiTimer } from "react-icons/tfi";
import { AiOutlineUser } from "react-icons/ai";
import { BsCalendarDate } from "react-icons/bs";
import Timer from "../Timer/Timer";
import "./Chef.css";
import Button from "../Button/Button";

function Chef() {
  const [dataOrders, setDataOrders] = useState([]);
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const user = localStorage.getItem("user");
  const userInLine = cutEmail(user);
  localStorage.setItem("userInLine", userInLine);
  const [getOrdersStatus, setGetOrdersStatus] = useState("loading");

  useEffect(() => {
    getOrders(authorization)
      .then((res) => {
        const listWithStatusPending = [...res].filter(
          (e) => e.status === "pending"
        );
        setDataOrders(listWithStatusPending);
        setGetOrdersStatus("success");
      })
      .catch((error) => {
        error;
        setGetOrdersStatus("error");
      });
  }, [authorization]);

  function confirmUpdate(id, status) {
    status = "delivered";
    updateOrder(authorization, id, status).then((res) => res);

    const newList = [...dataOrders].filter((e) => e.id !== id);
    return setDataOrders(newList);
  }

  // Otra manera de renderizar las ordenes
  //   const [filteredOrders, setFilteredOrders] = useState([]);

  // //dentro de useEffect:
  // const filtered = res.filter((order) => order.status !== "delivered");
  //       setFilteredOrders(filtered);

  // function confirmUpdate(id, status) {
  //     status = "delivered";
  //     updateOrder(authorization, id, status).then((res) => {
  //       const updatedOrders = filteredOrders.filter((order) => order.id !== id);
  //       setFilteredOrders(updatedOrders);
  //       return res;
  //     });
  //   }

  // //para renderizar:

  // filteredOrders.map((order) => {

  return (
    <>
      <Banner />
      <Header user={userInLine} text="Chef" />
      {getOrdersStatus === "loading" ? (
        <p data-testid="loadingOrders">Cargando...</p>
      ) : getOrdersStatus === "success" && dataOrders.length === 0 ? (
        <p data-testid="successWithNothing">Aún no hay pedidos</p>
      ) : getOrdersStatus === "success" ? (
        <div className="containerTableOrder" data-testid="tableOrders">
          <div className="columns">
            <span className="id">Orden</span>
            <span className="email">Detalle</span>
          </div>
          {dataOrders.map((order) => {
            const childrenOfOrder = order.products.map((e) => {
              return (
                <ul key={e.product.id}>
                  <li>{e.qty}</li>
                  <img
                    src={e.product.image}
                    alt="img product"
                    style={{ width: "70px", height: "70px" }}
                  />
                  <li>{e.product.name}</li>
                </ul>
              );
            });
            return (
              <div key={order.id} className="containerOrders">
                <div className="dataClient">
                  <ul>
                    <div className="client">
                      <AiOutlineUser size={25} />
                      <li>{order.client}</li>
                    </div>
                    <div className="timer">
                      <TfiTimer size={25} />
                      <li>
                        <Timer time={order.dateEntry} />
                      </li>
                    </div>
                  </ul>
                </div>
                <div className="dataOrder">
                  {childrenOfOrder}
                  <Button
                    id="btnUpdate"
                    text="Preparado"
                    onClick={() => confirmUpdate(order.id, order.status)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : getOrdersStatus === "error" ? (
        <p data-testid="ordersError">Ha ocurrido un error</p>
      ) : null}

      <Footer />
    </>
  );
}

export default Chef;
