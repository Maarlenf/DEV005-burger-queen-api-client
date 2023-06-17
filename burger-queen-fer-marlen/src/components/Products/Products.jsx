import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import Header from "../Header/Header";
import "../Header/Header.css";
import { getProducts } from "../../lib/api";
import {
    AiOutlineUserAdd,
    AiOutlineUserDelete,
    AiOutlineEdit,
  } from "react-icons/ai";
  import '../Products/Products.css';

function Products(){
    const [dataProducts, setDataProducts] = useState([]);
    const token = localStorage.getItem("token");
    const authorization = `Bearer ${token}`;
    const user = localStorage.getItem("userInLine");

    useEffect(() => {
        getProducts(authorization).then((res) => { 
        console.log(res);
        setDataProducts(res)})
    },[]);

    return (
        <>
          <Banner />
          <Header user={user} />
          <div className='containerButtons'>
            <div className='addUser' >
              <AiOutlineUserAdd size={50} />
              <span>Agregar Trabajador</span>
            </div>
            <div className='addUser'>
              <AiOutlineUserAdd size={50} />
              <span>Agregar Productos</span>
            </div>
          </div>
    
          <div className='containerTable'>
            <div className='columnsName'>
              <span className='id'>ID</span>
              <span className='email'>Nombre</span>
              <span className='pwd'>Precio</span>
              <span className='role'>Imagen</span>
              <span className='action'>Tipo</span>
              <span className='action'>Creación</span>
            </div>
            <div className='containerId'>
              {dataProducts.map((obj) => {
                return (
                  <>
                    <ul>{obj.id}</ul>
                    <ul>{obj.name}</ul>
                    <ul>{obj.price}</ul>
                   <img src ={obj.image} alt='producto' className="imageProduct"/>
                    <ul>{obj.type}</ul>
                    <ul>{obj.dateEntry}</ul>
                    <div>
                      <div className='icon1'>
                        <AiOutlineEdit
                          size={30}
                        />
                        <AiOutlineUserDelete
                          size={30}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
          <Footer />
        </>
      );
}

export default Products;