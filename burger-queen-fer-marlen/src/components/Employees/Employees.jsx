import { useState, useEffect } from "react";
import { cutEmail, getEmployees } from "../../lib/api";
import Banner from "../Banner/Banner";
import "../Banner/Banner.css";
import Footer from "../Footer/Footer";
import "../Footer/Footer.css";
import Header from "../Header/Header";
import "../Header/Header.css";
import "../Employees/Employees.css";
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import Modal from "../Modal/Modal";
import ModalDelete from "../ModalDelete/ModalDelete";
import ModalEdit from "../ModalEdit/ModalEdit";

function Employees() {
  // const [worker, setWorker] = useState("");
  // const [email, setEmail] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal, authorization, showModalDelete, showModalEdit]);

  return (
    <>
      {showModal && <Modal onClose={toggleModal} />}
      {showModalDelete && (
        <ModalDelete
          text='Acción irreversible, ¿Desea continuar con la eliminación?'
          onClose={toggleModalDelete}
          id={deleteUser}
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
          <AiOutlineUserAdd size={50} />
          <span>Agregar Productos</span>
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
        <div className='containerId'>
          {dataUser.map((obj) => {
            const email = cutEmail(obj.email);
            localStorage.setItem("id", obj.id);
            localStorage.setItem("id", obj.id);
            console.log(obj);
            return (
              <>
                <ul>{obj.id}</ul>
                <ul>{email}</ul>
                <ul>{"******"}</ul>
                <ul>{obj.role}</ul>
                <div>
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
              </>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Employees;
