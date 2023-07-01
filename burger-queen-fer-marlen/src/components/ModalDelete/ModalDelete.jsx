import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { deleteUser, deleteProduct } from "../../lib/api";
import "../ModalDelete/ModalDelete.css";

function ModalDelete({ onClose, text, id, optToDelete }) {
  console.log(optToDelete);
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;

  function confirm() {
    deleteItem(id);
  }

  const deleteItem = (id) => {
    if (optToDelete === "product") {
      deleteProduct(id, authorization)
        .then((res) => {
          console.log("producto eliminado", res);
          onClose();
        })
        .catch((err) => console.log(err.message));
    } else if (optToDelete === "user") {
      deleteUser(id, authorization)
        .then((res) => {
          console.log("usuario eliminado", res);
          onClose();
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <div className='modalDelete' id="modalDelete">
        <div className='innerModalDelete'>
          <div className='containerClose'>
            <AiOutlineClose sie={25} onClick={onClose} />
          </div>
          <span>{text}</span>
          <div className='containerCheck'>
            <AiOutlineCheck onClick={confirm} data-testid='confirmDelete' />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDelete;
