import logo from "../../assets/logo.png";
import Title from "../Title/Title";
import "../Title/Title.css";
function Logo() {
  return (
    <>
      <div>
        <img src={logo} className='logo' alt='Logo Burguer Queen' />
        <Title title='Administrador' />

        {/* icono */}
      </div>
    </>
  );
}

export default Logo;
