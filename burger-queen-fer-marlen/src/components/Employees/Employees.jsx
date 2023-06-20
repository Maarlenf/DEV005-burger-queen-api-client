import { useState, useEffect } from "react";
import { cutEmail, getEmployees } from "../../lib/api";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "../Employees/Employees.css";
import Button from '../Button/Button';
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import Modal from "../Modal/Modal";
import ModalDelete from "../ModalDelete/ModalDelete";
import ModalEdit from "../ModalEdit/ModalEdit";
import { useNavigate } from "react-router-dom";

function Employees() {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);
  const user = localStorage.getItem("userInLine");
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const [showModalEdit, setModalEdit] = useState(false);
  const [editingUser, setEdit] = useState();
  const [deleteUser, setDelete] = useState();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleModalDelete = (id) => {
    setModalDelete(!showModalDelete);
    setDelete(id);
  };
  const toggleModalEdit = (user) => {
    setModalEdit(!showModalEdit);
    setEdit(user);
  };
  useEffect(() => {
    getEmployees(authorization).then((res) => {
      setDataUser(res);
    });
  }, [showModal, authorization, showModalDelete, showModalEdit]);

  function navigateProducts(){
    navigate('/admin/products');
  }
 
  return (
    <>
      {showModal && <Modal onClose={toggleModal} />}
      {showModalDelete && (
        <ModalDelete
          text='Acción irreversible, ¿Desea continuar con la eliminación?'
          onClose={toggleModalDelete}
          id={deleteUser}
          optToDelete={"user"}
        />
      )}
      {showModalEdit && (
        <ModalEdit
          onClose={toggleModalEdit}
          userData={editingUser}
          token={authorization}
        />
      )}
      <Banner />
      <Header user={user} />

      <div className='containerButtons'>
        <div className='addUser' hidden={showModal} onClick={toggleModal}>
          <AiOutlineUserAdd size={50} />
          <span>Agregar Trabajador</span>
        </div>
        <div className='addUser'>
          <Button text= 'Productos' id='btnProduct' onClick={navigateProducts}/>
        </div>
      </div>

      <div className='containerTable'>
        <div className='columnsName'>
          <span className='id'>ID</span>
          <span className='email'>Email</span>
          <span className='pwd'>Contraseña</span>
          <span className='role'>Rol</span>
          <span className='action'>Acción</span>
        </div>
        {/* <div className="containerId">
          {dataUser.map((obj) => {
             const email = cutEmail(obj.email);
            return (
              <div className="probe" key={obj.id}>
               <div className='icon1'>
                    <AiOutlineEdit
                      size={30}
                      onClick={() => toggleModalEdit(obj)}
                    />
                    <AiOutlineUserDelete
                      onClick={() => toggleModalDelete(obj.id)}
                      size={30}
                    />
                  </div>
              </div>
            )
          })}
        </div> */}
        <div className='containerId'>
          {dataUser.map((obj) => {
            const email = cutEmail(obj.email);
            return (
             <ul key={obj.id}>
                <li>{obj.id}</li>
                <li>{email}</li>
                <li>{"******"}</li>
                <li>{obj.role}</li>
                  <div className='icon1'>
                    <AiOutlineEdit
                      size={30}
                      onClick={() => toggleModalEdit(obj)}
                    />
                    <AiOutlineUserDelete
                      onClick={() => toggleModalDelete(obj.id)}
                      size={30}
                    />
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

export default Employees;