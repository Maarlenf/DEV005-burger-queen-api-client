import logo from "../../assets/logo.png";
import Title from "../Title/Title";
import "../Title/Title.css";
import { AiOutlineUser } from "react-icons/ai";
function Logo() {
  return (
    <>
      <div>
        <img src={logo} className='logo' alt='Logo Burguer Queen' />
        <Title title='Administrador' />

        {/* icono */}
        <AiOutlineUser />
      </div>
    </>
  );
}

export default Logo;
