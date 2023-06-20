import { useEffect, useState } from "react";
import { getProducts } from "../../lib/api";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Button from "../Button/Button";
import { AiOutlineEdit } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineNoFood } from "react-icons/md";
import "../Products/Products.css";
import { useNavigate } from "react-router-dom";
import ModalEditProduct from "../ModalEditProduct/ModalEditProduct";
import ModalDelete from "../ModalDelete/ModalDelete";
import Input from "../Input/Input";

function Products() {
  const navigate = useNavigate();
  const [dataProducts, setDataProducts] = useState([]);
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const user = localStorage.getItem("userInLine");
  const [showModalEditProduct, setShowModalEdit] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);
  const [editingProduct, setEditing] = useState();
  const [deleteProduct, setDelete] = useState();
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    getProducts(authorization).then((res) => {
      setDataProducts(res);
    });
  }, [authorization, showModalDelete, showModalEditProduct]);

  function navigateEmploye() {
    navigate("/admin/employees");
  }

  const toggleModalEdit = (product) => {
    setShowModalEdit(!showModalEditProduct);
    if (!product) {
      setEditing("");
    } else {
      setEditing(product);
    }
  };

  const toggleModalDelete = (id) => {
    setModalDelete(!showModalDelete);
    setDelete(id);
  };

  function filter(param) {
    if (selectedTypes.includes(param)) {
      // El tipo ya se selccionó, se tiene  que remover
      setSelectedTypes(selectedTypes.filter((type) => type !== param));
    } else {
      // El tipo no estaba seleccionado, se tiene que agregar
      setSelectedTypes([...selectedTypes, param]);
    }
  }

  return (
    <>
      {showModalEditProduct && (
        <ModalEditProduct
          onClose={toggleModalEdit}
          dataProduct={editingProduct}
          token={authorization}
        />
      )}
      {showModalEditProduct && (
        <ModalEditProduct
          onClose={toggleModalEdit}
          dataProduct={editingProduct}
          token={authorization}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          text="Acción irreversible, ¿Desea continuar con la eliminación?"
          onClose={toggleModalDelete}
          id={deleteProduct}
          optToDelete={"product"}
        />
      )}
      <Banner />
      <Header user={user} />
      <div className="containerButtons">
        <div className="addUser">
          {/* <AiOutlineUserAdd size={50} />
              <span>Agregar Trabajador</span> */}
          <Button
            text="Trabajadores"
            id="btnEmployee"
            onClick={navigateEmploye}
          />
        </div>
        <div className="addProduct" onClick={toggleModalEdit}>
          <IoFastFoodOutline size={50} />
          <span>Agregar Productos</span>
        </div>
      </div>
      
      <div className="containerOptions">
        <div className="optionDes">
        <span>Desayuno</span>
      <Input
          type="checkbox"
          id="topping"
          value="Desayuno"
          checked=''
          onChange={e => {filter(e.target.value)}}
        />
        </div>
              <div className="optionAlm">
              <span>Almuerzo</span>
        <Input
          type="checkbox"
          name='Almuerzo'
          id="topping"
          value="Almuerzo"
          checked=''
          onChange={e => filter(e.target.value)}
        />
              </div>
        <div className="optionCen">
        <span>Cena</span>
        <Input
          type="checkbox"
          id="topping"
          value="Cena"
          checked=''
          onChange={e => filter(e.target.value)}
        />
        </div>
      </div>
      <div className="containerTable">
        <div className="columnsNames">
          <span className="id">ID</span>
          <span className="email">Nombre</span>
          <span className="pwd">Precio</span>
          <span className="role">Imagen</span>
          <span className="action">Tipo</span>
          <span className="action">Creación</span>
          <span className="option">Acción</span>
        </div>
        <div className='containerIds'>
          {dataProducts
            .filter((product) =>
              selectedTypes.length === 0
                ? true
                : selectedTypes.includes(product.type)
            )
            .map((obj) => {
              return (
                  <ul key={obj.id}>
                  <li>{obj.id}</li>
                  <li>{obj.name}</li>
                  <li>{obj.price}</li>
                  <img
                    src={obj.image}
                    alt='producto'
                    className='imageProduct'
                  />
                  <li>{obj.type}</li>
                  <li>{obj.dateEntry}</li>
                  <div>
                    <div className='icon1'>
                      <AiOutlineEdit
                        size={30}
                        onClick={() => toggleModalEdit(obj)}
                      />
                      <MdOutlineNoFood
                        onClick={() => toggleModalDelete(obj.id)}
                        size={30}
                      />
                    </div>
                  </div>
                  </ul>
              );
            })}
        </div>
        </div>
      <Footer />
    </>
  );
}

export default Products;
