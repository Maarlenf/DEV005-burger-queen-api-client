import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cutEmail, getOrders } from "../../lib/api";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { AiOutlineEdit } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineNoFood } from "react-icons/md";
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
  console.log(user)
  const navigate = useNavigate();

  useEffect(() => {
    getOrders(authorization).then((res) => {
      setDataOrders(res);
    });
  }, []);

  // function toDoOrder() {
  //   navigate("/waiter");
  // }

  return (
    <>
      <Banner />
      <Header user={userInLine} text="Chef" />
      <div className="containerButtons">
        {/* <div className="addUser">
          <Button text="Pedidos" id="btnEmployee" />
        </div> */}
        <div className="addProduct">
          {/* <IoFastFoodOutline size={50} onClick={toDoOrder} /> */}
          <span>Ir a tomar Pedido</span>
        </div>
      </div>
      <div className="containerTableOrder">
        <div className="columns">
          <span className="id">Orden</span>
          <span className="email">Detalle</span>
        </div>
        <div className="containerOrders">
          {dataOrders.map((order) => {
            // console.log(order.products[0].product);
            return (
              <>
                <div className="dataClient">
                  <ul key={order.id}>
                    <div className="client">
                      <AiOutlineUser size={25} />
                      <li>{order.client}</li>
                    </div>
                    <div className="timeEntry">
                      <BsCalendarDate size={25} />
                      <li>
                        {order.dateEntry.replace("T", " ").slice(0, -5) +
                          "hrs."}
                      </li>
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
                  {order.products[0].product.map((e) => {
                    return (
                      <>
                        <ul key={e.id}>
                          <li>{e.qty}</li>
                          <img
                            src={e.product.image}
                            alt="img product"
                            style={{ width: "70px", height: "70px" }}
                          />
                          <li>{e.product.name}</li>
                          {/* <div className="icon1">
                            <AiOutlineEdit
                              size={30}
                              //   onClick={() => toggleModalEdit(obj)}
                            />
                            <MdOutlineNoFood
                              //   onClick={() => toggleModalDelete(obj.id)}
                              size={30}
                            />
                          </div> */}
                        </ul>
                      </>
                    );
                  })}
                  <Button text='Entregar orden'/>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chef;
