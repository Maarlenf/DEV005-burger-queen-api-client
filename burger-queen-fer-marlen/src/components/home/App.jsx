import { useState } from 'react'
// import reactLogo from '../../assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import  bannerBurger from '../../assets/bannerBurgerOpaca.png'
import logoBurger from '../../assets/logoBurguerQueen.png'


function App() {
 const [valueEmail, setEmail] = useState("");
 const [valuePwd, setPwd] = useState("");
 const [fail, setError] =useState("");
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
      // eslint-disable-next-line no-unused-vars
      const error = await respuesta.json();
      throw new Error(setError('¡Ups! Algo salío mal. Compruebe sus credenciales'));
    }
  } catch (error) {
    // Manejo de errores, por ejemplo, mostrar un mensaje de error en la interfaz.
    console.error(error);
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
      <div>
        <img src={bannerBurger} className='banner' alt='Banner Burger Queen' />
      </div>
      <div>
        <img src={logoBurger} className = 'logo' alt='Logo Burger Queen' />
      </div>
      <h1>Iniciar sesión</h1>
      <div className="formLogin">
       <form method="post" onSubmit={handleSubmit}>
        <label>
          <p className='p-login'>Correo electrónico</p>
          <input type='email' id='email' className= 'input' placeholder='example@live.cl' value={valueEmail} 
          // ... fuerza al valor del input para que coincida con la variable de estado...
      onChange={e => setEmail(e.target.value)}/>
        </label>
        <label>
          <p className='p-login'>Contraseña</p>
          <input type='password' id='password' className='input' placeholder='*******' autoComplete='current-password' value={valuePwd} 
          // ... fuerza al valor del input para que coincida con la variable de estado...
      onChange={e => setPwd(e.target.value)}/>
          <span className='failLogin'>{fail}</span>
        </label>
        <label>
          <button type= 'submit' id='btnLogin' className='btn'>Iniciar sesión</button>
        </label>
       </form>
      </div>
      <footer><p>Created by @Fer and @Marlen</p></footer>
    </>
  )
}

export default App

