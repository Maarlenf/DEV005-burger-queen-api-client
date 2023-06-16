import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { deleteUser } from "../../lib/api";
import "../ModalDelete/ModalDelete.css";

function ModalDelete({ onClose, text, id }) {
  const token = localStorage.getItem("token");
  const authorization = `Bearer ${token}`;

  function confirm() {
    deleteEmployee(id);
  }

  const deleteEmployee = (id) => {
    deleteUser(id, authorization)
      .then((res) => {
        // console.log(res.id);
        console.log("usuario eliminado", res);
        onClose();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className='modalDelete'>
        <div className='innerModalDelete'>
          <div className='containerClose'>
            <AiOutlineClose sie={25} onClick={onClose} />
          </div>
          <span>{text}</span>
          <div className='containerCheck'>
            <AiOutlineCheck onClick={confirm} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDelete;
