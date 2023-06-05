// import { useState } from "react";
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import bannerBurguer from "../../assets/bannerHamburguesa.png";
import logo from "../../assets/logo.png";

function App() {
  return (
    <>
      <div>
        <img
          src={bannerBurguer}
          className='banner'
          alt='Banner Burguer Queen'
        />
        {/* <a href="https://vitejs.dev" target="_blank" rel="noreferrer"> */}
        {/* <img src={viteLogo} className="logo" alt="Vite logo" /> */}
        {/* </a> */}
        {/* <a href="https://react.dev" target="_blank" rel="noreferrer"> */}
        {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        {/* </a> */}
      </div>
      <div>
        <img src={logo} className='logo' alt='Logo Burguer Queen' />
      </div>
      <h1>Iniciar Sesión</h1>
      <div className='formLogin'>
        <form method='post'>
          <label>
            <p>Correo Electrónico</p>
            <input
              className='input'
              id='email'
              name='myInput'
              placeholder='example@example'
            />
          </label>
          <label>
            <p>Contraseña</p>
            <input
              className='input'
              id='password'
              name='myInput'
              placeholder='******'
            />
          </label>

          <button id='btnLogin' type='submit'>
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
