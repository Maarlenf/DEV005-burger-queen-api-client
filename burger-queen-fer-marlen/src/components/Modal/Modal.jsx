import Input from "../Input/Input";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { createUser } from "../../lib/api";
import { useState } from "react";
import "../Modal/Modal.css";

function Modal({ onClose }) {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  const listRole = [
    { role: "admin", title: "Administrador/a" },
    { role: "chef", title: "Cocinera/o" },
    { role: "waiter", title: "Mesera/o" },
  ];
  const [newRole, setNewRole] = useState(listRole[0].role);

  const saveUser = () => {
    return createUser(newUser, newPass, newRole).then(() => {
      onClose();
    });
  };

  return (
      <div className='modal' id="modalCreateUser">
        <div className='innerModal'>
          <div className='containerClose'>
            <AiOutlineClose size={30} onClick={onClose} />
          </div>

          <form action='submit' className='viewAdmin'>
            <label>
              <Input
                textLabel='Correo Electrónico'
                type='email'
                className='input'
                id='email'
                placeholder='example@examle.com'
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
            </label>
            <label>
              <Input
                textLabel='Contraseña'
                type='password'
                className='input'
                id='password'
                placeholder='******'
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </label>
            {listRole.map((e) => {
              return (
                  <div className='containerRadio' key={e.role}>
                    <label >
                      <input
                        type='radio'
                        name='myRadio'
                        value={e.role}
                        checked={newRole === e.role}
                        onChange={() => {
                          setNewRole(e.role);
                        }}
                      />
                      {e.title}
                    </label>
                  </div>
              );
            })}
            <div>
              <AiOutlineCheck size={30} onClick={saveUser} data-testid='saveUser'/>
            </div>
          </form>
        </div>
      </div>
  );
}

export default Modal;
