/* eslint-disable no-unused-vars */
import { useNavigate} from "react-router-dom";
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
// import { getLogin } from '../getApi/api.js'

function App({getToken}) {
  const navigate = useNavigate();
  const [valueEmail, setEmail] = useState("");
  const [valuePwd, setPwd] = useState("");
  const [fail, setError] = useState("");
 
  // console.log(setEmail,setPwd)
  // const login = () => {
  //   getLogin(valueEmail, valuePwd, setError).then((res) => {
  //     console.log(res, 'HOLAAAAA');
  //     navigate('/admin', {state:{campo: 'no funciona'}})
  //   //  return Promise.all(navigate('/admin', { state: { user: res.user.email } }))
  //   })
  // }
  // const login = (setEmail, setPwd, setError) => {
  //     getLogin(setEmail, setPwd, setError).then((res) => {
  //       getToken = res.accessToken;
  //       navigate('/admin', { state: { user: res.email } });
  //     }).catch();
  //   }
  
  const login = async () => {
    
    try {
      const respuesta = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: valueEmail,
          password: valuePwd,
        }),
      });

      if (respuesta.ok) {
        const datos = await respuesta.json();
        console.log(datos.user.email);
        navigate("/admin", { state: { user: datos.user.email } });
        
      } else {
        const error = await respuesta.json();
        throw new Error(
          setError("¡Ups! Algo salío mal. Compruebe sus credenciales")
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
 
  function handleSubmit(e) {
    e.preventDefault();
    return login();
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
            textLabel='Email'
            className='p-login'
            type="email"
            id="email"
            placeholder="example@examle.com"
            value={valueEmail}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            textLabel='Contraseña'
            className='p-login'
            type='password'
            autoComplete='current-password'
            id='password'
            name='myInput'
            placeholder='******'
            value={valuePwd}
            onChange={(e) => setPwd(e.target.value)}
          />
            <span className="failLogin">{fail}</span>
          <label>
            <Button id='btnLogin' type='submit' text="Iniciar Sesión" />
          </label>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default App;
