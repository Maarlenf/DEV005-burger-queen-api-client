import { useState, useEffect } from "react";
import { cutEmail, getEmployees } from "../../lib/api";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
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
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

function Employees() {
  // const [worker, setWorker] = useState("");
  // const [email, setEmail] = useState("");
  const user = localStorage.getItem("userInLine");
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;
  const [dataUser, setDataUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setModalDelete] = useState(false);
  const [showModalEdit, setModalEdit] = useState(false);
  const [editingUser, setEdit] = useState();
  const [deleteUser, setDelete] = useState();
  const navigate = useNavigate();
  console.log(authorization);
  function goProducts() {
    return navigate("/admin/products");
  }
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
      <Header user={user} text='Administrador' />

      <div className='containerButtons'>
        <div className='addUser' hidden={showModal} onClick={toggleModal}>
          <AiOutlineUserAdd size={50} />
          <span>Agregar Trabajador</span>
        </div>
        <div className='addUser'>
          <Button
            id='btnProduct'
            type='submit'
            text='Productos'
            onClick={goProducts}
          />
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
              <ul key={obj.id}>
                <li>{obj.id}</li>
                <li>{email}</li>
                <li>{"******"}</li>
                <li>{obj.role}</li>
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