import Input from "../Input/Input";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { createUser } from "../../lib/api";
import { useState } from "react";

function Modal({ onClose }) {
  const [newUser, setNewUser] = useState("");
  const [newPass, setNewPass] = useState("");
  
  const listRole = [
    { role: "admin", title: "Administrador/a" },
    { role: "chef", title: "Cocinera/o" },
    { role: "waiter", title: "Mesera/o" },
  ];

  const [newRole, setNewRole] = useState('');

 
  const saveUser = () => {
    return createUser(newUser, newPass, newRole).then((res) => console.log('usuario creado', res))
  }

  // console.log(newRole);
  return (
    <>
      <div className="modal">
        <div className="innerModal">
          <div>
            <AiOutlineClose size={30} onClick={onClose} />
          </div>

          <form action="submit" className="viewAdmin">
            <label>
              <Input
                textLabel="Correo Electrónico"
                type="email"
                className="input"
                id="email"
                placeholder="example@examle.com"
                value={newUser}
                onChange={(e) => setNewUser(e.target.value)}
              />
            </label>
            <label>
              <Input
                textLabel="Contraseña"
                type="password"
                className="input"
                id="password"
                placeholder="******"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </label>
            {listRole.map((e) => {
              return (
                <>
                  <label key={e.id}>
                    <input type="radio" name="myRadio" value={e.role} onChange={() =>{
                      setNewRole(e.role)}}/>
                    {e.title}
                  </label>
                </>
              );
            })}
            <div>
              <AiOutlineCheck size={30} onClick={saveUser} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Modal;
