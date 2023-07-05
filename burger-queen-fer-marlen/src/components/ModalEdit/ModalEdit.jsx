import { useState } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import Input from "../Input/Input";
// import "../Input/Input.css";
import { editUser } from "../../lib/api";

function ModalEdit({ onClose, userData, token }) {
  const [employee, setEmployee] = useState(userData.email);
  const [pass, setPass] = useState();
  const [role, setRole] = useState(userData.role);

  const listRole = [
    { role: "admin", title: "Administrador/a" },
    { role: "chef", title: "Cocinera/o" },
    { role: "waiter", title: "Mesera/o" },
  ];
  const confirm = () => {
    editUser(token, userData.id, employee, pass, role).then((res) =>
      console.log(res)
    );
    onClose();
  };
  return (
    <>
      <div className='modal' id='modalEdit'>
        <div className='innerModal'>
          <div className='containerClose'>
            <AiOutlineClose size={30} onClick={onClose} />
          </div>
          <form action='submit' className='viewAdmin'>
            <>
              <label>
                <Input
                  textLabel='Correo Electrónico'
                  type='email'
                  className='input'
                  placeholder='example@examle.com'
                  value={employee}
                  onChange={(e) => setEmployee(e.target.value)}
                />
              </label>
              <label>
                <Input
                  textLabel='Contraseña'
                  type='password'
                  className='input'
                  placeholder='******'
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </label>
              <div className='containerRadio'>
                {listRole.map((e) => {
                  //   console.log(e);
                  return (
                    <label key={e.role}>
                      <input
                        type='radio'
                        // key={e.id}
                        name='myRadio'
                        value={role}
                        defaultChecked={role === e.role}
                        onChange={() => {
                          setRole(e.role);
                        }}
                      />
                      {e.title}
                    </label>
                  );
                })}
              </div>
              <div className='containerChecks'>
                <AiOutlineCheck
                  size={30}
                  onClick={confirm}
                  data-testid='confirmEditUsers'
                />
              </div>
            </>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalEdit;
