import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Button from "../Button/Button";
import "../Button/Button.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import Header from "../Header/Header";
import "../Header/Header.css";
import "../Admin/Admin.css";
import { useNavigate, useLocation } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const user = data.user;
  const cutName = user.indexOf("@");
  const userInLine = user.substring(0, cutName);
  function goEmployees() {
    return navigate("/admin/employees", { state: { user: userInLine } });
  }
  return (
    <>
      <Banner></Banner>
      <Header user={userInLine} />
      <div className='containerButton'>
        <Button
          id='btnEmployees'
          type='submit'
          text='Trabajadores'
          onClick={goEmployees}
        ></Button>
        <Button id='btnProducts' type='submit' text='Productos'></Button>
      </div>

      <Footer></Footer>
    </>
  );
}
// grace.hopper@systers.xyz
export default Admin;
