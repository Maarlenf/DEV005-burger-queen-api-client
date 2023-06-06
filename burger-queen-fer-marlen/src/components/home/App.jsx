import { useState } from "react";
import "./App.css";
import bannerBurguer from "../../assets/banner-opacity.png";
import logo from "../../assets/logo.png";

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
      // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz.
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
      <div className='contain-banner'>
        <img
          src={bannerBurguer}
          className='banner'
          alt='Banner Burguer Queen'
        />
      </div>
      <div>
        <img src={logo} className='logo' alt='Logo Burguer Queen' />
      </div>
      <h1>Iniciar Sesión</h1>
      <div className='formLogin'>
        <form method='post' onSubmit={handleSubmit}>
          <label>
            <p className='p-login'>Correo Electrónico</p>
            <input
              type='email'
              className='input'
              id='email'
              name='myInput'
              placeholder='example@example'
              value={valueEmail}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <p className='p-login'>Contraseña</p>
            <input
              type='password'
              autoComplete='current-password'
              className='input'
              id='password'
              name='myInput'
              placeholder='******'
              value={valuePwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            {fail && <span className='failLogin'>{fail}</span>}
          </label>
          <button id='btnLogin' className='btn' type='submit'>
            Iniciar sesión
          </button>
        </form>
      </div>
      <footer>
        <p>Creado por @marlen & @fer</p>
      </footer>
    </>
  );
}

export default App;
