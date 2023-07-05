import { useState, useEffect } from "react";
import { getOrders, cutEmail, updateOrder } from "../../lib/api";
import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { AiOutlineEdit, AiOutlineUser } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineNoFood } from "react-icons/md";
import "./Chef.css";
import { TfiTimer } from "react-icons/tfi";
import { BsCalendarDate } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Timer from "../Timer/Timer";

function Chef() {
  const navigate = useNavigate();

  const [dataOrders, setDataOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [getOrdersStatus, setGetOrdersStatus] = useState("loading");

  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const user = localStorage.getItem("user");
  const userInLine = cutEmail(user);
  localStorage.setItem("userInLine", userInLine);

  useEffect(() => {
    getOrders(authorization)
      .then((res) => {
        setGetOrdersStatus("success");
        setDataOrders(res);
        const filtered = res.filter((order) => order.status !== "delivered");
        setFilteredOrders(filtered);

        // const listWithStatusPending = [...res].filter(
        //   (e) => e.status === "pending"
        // );
        // setDataOrders(listWithStatusPending);
      })
      .catch((error) => {
        setFilteredOrders("error");
      });
  }, []);

  function confirmUpdate(id, status) {
    status = "delivered";
    updateOrder(authorization, id, status).then((res) => {
      alert("Enviado al mesero con éxito");
      const updatedOrders = filteredOrders.filter((order) => order.id !== id);
      setFilteredOrders(updatedOrders);

      return res;
    });
  }
  return (
    <>
      <Banner />
      <Header user={userInLine} text={"Chef"} />
      {getOrdersStatus === "loading" ? (
        <p data-testid='loadingOrders'>Cargando...</p>
      ) : getOrdersStatus === "success" && filteredOrders.length === 0 ? (
        <p data-testid='successWithNothing'>Aún no hay pedidos</p>
      ) : getOrdersStatus === "success" ? (
        <div className='containerTableOrder'>
          <div className='columns'>
            <span className='id'>Orden</span>
            <span className='email'>Detalle</span>
          </div>
          <div className='containerOrders'>
            {filteredOrders.map((order) => {
              return (
                <>
                  <div className='dataClient' key={order.id}>
                    <ul>
                      <div className='client'>
                        <AiOutlineUser size={25} />
                        <li>{order.client}</li>
                      </div>
                      <div className='timeEntry'>
                        <BsCalendarDate size={25} />
                        <li>
                          {order.dateEntry.replace("T", " ").slice(0, -5) +
                            "hrs."}
                        </li>
                      </div>
                      <div className='timer'>
                        <TfiTimer size={25} />
                        <li>
                          <Timer time={order.dateEntry} />
                        </li>
                      </div>
                    </ul>
                  </div>
                  <div className='dataOrder'>
                    {order.products[0].product.map((e) => {
                      return (
                        <ul key={e.id}>
                          <li>{e.qty}</li>
                          <img
                            src={e.product.image}
                            alt='img product'
                            style={{ width: "70px", height: "70px" }}
                          />
                          <li>{e.product.name}</li>
                        </ul>
                      );
                    })}
                    <Button
                      text='Realizado'
                      id='btnUpdate'
                      onClick={() => confirmUpdate(order.id, order.status)}
                    />
                  </div>
                </>
              );
            })}
          </div>
        </div>
      ) : getOrdersStatus === "error" ? (
        <p data-testid='ordersError'>Ha ocurrido un error</p>
      ) : null}
      <Footer />
    </>
  );
}

export default Chef;
