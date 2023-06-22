import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Button from "../Button/Button";
import "../Button/Button.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import Header from "../Header/Header";
import "../Header/Header.css";
import "../Admin/Admin.css";
import { useNavigate } from "react-router-dom";
import { cutEmail } from "../../lib/api";

function Admin() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const userInLine = cutEmail(user);
  localStorage.setItem("userInLine", userInLine);
  function goEmployees() {
    return navigate("/admin/employees");
  }
  function goProducts() {
    return navigate("/admin/products");
  }
  return (
    <>
      <Banner></Banner>
      <Header user={userInLine} text={"Administrador"} />
      <div className='containerButton'>
        <Button
          id='btnEmployees'
          type='submit'
          text='Trabajadores'
          onClick={goEmployees}
        ></Button>
        <Button
          id='btnProducts'
          type='submit'
          text='Productos'
          onClick={goProducts}
        ></Button>
      </div>

      <Footer></Footer>
    </>
  );
}
// grace.hopper@systers.xyz
export default Admin;
