import Title from "../Title/Title";
import "../Title/Title.css";
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logo } from "../../images.js";

function Header({ user, text }) {
  const navigate = useNavigate();

  function logout() {
    return navigate("/");
  }

  return (
    <>
      <div className='containerBanner'>
        <img src={logo} className='logoSmall' alt='Logo Burguer Queen' />
        <Title title={text} />
        <div className='containerUser'>
          <AiOutlineUser size={50} />
          <span>
            {user}{" "}
            <MdLogout data-testid={"logout-icon"} size={22} onClick={logout} />
          </span>
        </div>
      </div>
    </>
  );
}

export default Header;
