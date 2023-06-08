import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import Header from "../Header/Header";
import "../Header/Header.css";
import { useLocation } from "react-router-dom";

function Employees() {
  const location = useLocation();
  console.log(location);
  const data = location.state;
  const user = data.user;
  return (
    <>
      <Banner></Banner>
      <Header user={user} />
      <Footer></Footer>
    </>
  );
}

export default Employees;
