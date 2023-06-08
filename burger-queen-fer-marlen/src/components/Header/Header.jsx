// import { userState } from 'react';
import logo from '../../assets/logoBurguerQueen.png'
import Tittle from "../Tittle/Tittle";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {MdLogout} from "react-icons/md";

function Header({user}){
  const navigate = useNavigate();

  function logout(){
    return navigate('/');
  }

    return(
    <>
      <div className='containerBanner'>
        <img src={logo} className="logoSmall" alt="Logo Burger Queen" />
        <Tittle text='Administrador'/>
        <div className='containerUser'>
          <AiOutlineUser size={50}/>
          <span>{user} <MdLogout className='iconOut'size={27} onClick={logout}/> </span>
        </div>
      </div>
    </>
    )
}

export default Header