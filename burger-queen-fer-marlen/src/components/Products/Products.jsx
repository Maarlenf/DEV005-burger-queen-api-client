import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Header from "../Header/Header";
import "../Header/Header.css";
import { getProducts } from "../../lib/api";
import Button from "../Button/Button";
import "../Button/Button.css";
import { AiOutlineEdit } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineNoFood } from "react-icons/md";
import "../Products/Products.css";
import { useNavigate } from "react-router-dom";
import ModalEditProduct from "../ModalEditProduct/ModalEditProduct";
import "../ModalEditProduct/ModalEditProduct.css";
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
      // console.log(res)
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
          id='modalEditProduct'
          onClose={toggleModalEdit}
          dataProduct={editingProduct}
          token={authorization}
        />
      )}
      {showModalDelete && (
        <ModalDelete
          text='Acción irreversible, ¿Desea continuar con la eliminación?'
          onClose={toggleModalDelete}
          id={deleteProduct}
          optToDelete={"product"}
        />
      )}
      <Banner />
      <Header user={user} text='Administrador' />
      <div className='containerButtons'>
        <div className='addUser'>
          <Button
            text='Trabajadores'
            id='btnEmployee'
            onClick={navigateEmploye}
          />
        </div>
        <div className='addProduct' onClick={toggleModalEdit}>
          <IoFastFoodOutline size={50} />
          <span>Agregar Productos</span>
        </div>
      </div>

      <div className='containerOptions'>
        <div className='optionDes'>
          <span>Desayuno</span>
          <Input
            type='checkbox'
            id='toppingDes'
            value='Desayuno'
            checked={selectedTypes.includes("Desayuno")}
            onChange={(e) => filter(e.target.value)}
          />
        </div>
        <div className='optionAlm'>
          <span>Almuerzo</span>
          <Input
            type='checkbox'
            name='Almuerzo'
            id='toppingAlm'
            value='Almuerzo'
            checked={selectedTypes.includes("Almuerzo")}
            onChange={(e) => filter(e.target.value)}
          />
        </div>
        <div className='optionCen'>
          <span>Cena</span>
          <Input
            type='checkbox'
            id='toppingCen'
            value='Cena'
            checked={selectedTypes.includes("Cena")}
            onChange={(e) => filter(e.target.value)}
          />
        </div>
      </div>

      <div className='containerTable' data-testid='tableProducts'>
        <div className='columnsNames'>
          <span className='id'>ID</span>
          <span className='email'>Nombre</span>
          <span className='pwd'>Precio</span>
          <span className='role'>Imagen</span>
          <span className='action'>Tipo</span>
          <span className='action'>Creación</span>
          <span className='action'>Opción</span>
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
                        data-testid='checkEditProduct'
                        size={30}
                        onClick={() => toggleModalEdit(obj)}
                      />
                      <MdOutlineNoFood
                        data-testid='deleteProduct'
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
    </>
  );
}

export default Products;
