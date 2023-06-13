/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "../Banner/Banner.css";
import "../Tittle/Tittle.css";
import "../Input/Input.css";
import "../Button/Button.css";
import "../Footer/Footer.css";
import Banner from "../Banner/Banner";
import logoBurger from "../../assets/logoBurguerQueen.png";
import Tittle from "../Tittle/Tittle";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Footer from "../Footer/Footer";
import { getLogin } from "../../lib/api.js";


function App() {
  const navigate = useNavigate();
  const [valueEmail, setEmail] = useState("");
  const [valuePwd, setPwd] = useState("");
  const [fail, setFail] = useState("");

  const login = () => {
    getLogin(valueEmail, valuePwd)
      .then((res) => {
        navigate("/admin", { state: { user: res.user.email } });
        const getToken = res.accessToken;
        localStorage.setItem("user", res.user.email);
        localStorage.setItem("token", getToken);
      })
      .catch(
        (err) =>
          new Error(
            setFail(
              "¡Ups! Ha ocurrido un error. Por favor verifica tu credenciales"
            )
          )
      );
  };

  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  return (
    <>
      <Banner />
      <div>
        <img src={logoBurger} className="logo" alt="Logo Burger Queen" />
      </div>
      <Tittle text="Iniciar Sesión" />
      <div className="formLogin">
        <form method="post" onSubmit={handleSubmit}>
          <Input
            textLabel="Email"
            className="p-login"
            type="email"
            id="email"
            placeholder="example@examle.com"
            value={valueEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            textLabel="Contraseña"
            className="p-login"
            type="password"
            autoComplete="current-password"
            id="password"
            name="myInput"
            placeholder="******"
            value={valuePwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <span className="failLogin">{fail}</span>
          <label>
            <Button id="btnLogin" type="submit" text="Iniciar Sesión" />
          </label>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default App;
