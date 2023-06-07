import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Button from "../Button/Button";
import "../Button/Button.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import Header from "../Header/Header";
import "../Header/Header.css";

function Admin() {
  return (
    <>
      <Banner></Banner>
      <Header></Header>
      <Button id='btnEmployees' type='submit' text='Trabajadores'></Button>
      <Button id='btnProducts' type='submit' text='Productos'></Button>
      <Footer></Footer>
    </>
  );
}

export default Admin;
