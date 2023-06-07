import { useState } from "react";
import "./App.css";
import logo from "../../assets/logo.png";
import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Title from "../Title/Title";
import "../Title/Title.css";
import Input from "../Input/Input";
import "../Input/Input.css";
import Button from "../Button/Button";
import "../Button/Button.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";

function App() {
  const [valueEmail, setEmail] = useState("");
  const [valuePwd, setPwd] = useState("");
  const [fail, setFail] = useState("");

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
        // La petición fue exitosa
        const datos = await respuesta.json();
        console.log(datos);
      } else {
        // La petición falló
        // const error = await respuesta.json();
        throw new Error(
          setFail("Ups! Algo salió mal. Compruebe sus credenciales")
        );
      }
    } catch (error) {
      // Manejo de errores
    }
  };
  function handleSubmit(e) {
    // Previene que el navegador recargue la página
    e.preventDefault();
    // Lee los datos del formulario
    login();
  }

  return (
    <>
      <Banner />
      <div>
        <img src={logo} className='logo' alt='Logo Burguer Queen' />
      </div>
      <Title title='Iniciar Sesión' />
      <div className='formLogin'>
        <form method='post' onSubmit={handleSubmit}>
          <Input
            textLabel='Correo Electrónico'
            type='email'
            className='input'
            id='email'
            placeholder='example@examle.com'
            value={valueEmail}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            textLabel='Contraseña'
            type='password'
            className='input'
            autoComplete='current-password'
            id='password'
            name='myInput'
            placeholder='******'
            value={valuePwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          {fail && <span className='failLogin'>{fail}</span>}

          <Button id='btnLogin' type='submit' text='Iniciar Sesión' />
        </form>
      </div>
      <Footer />
    </>
  );
}

export default App;
