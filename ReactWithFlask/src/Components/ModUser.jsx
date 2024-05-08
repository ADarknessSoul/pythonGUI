import React, { useEffect, useState } from "react";
import { UsuarioCampo } from "./UsuarioCampo";
import axios from "axios";

export const ModUser = ({ num }) => {
  const [currentUser, setCurrentUser] = useState(1);
  const [user, setUser] = useState({});
  const [modifying, setModifying] = useState(false);
  const [modifyingValue, setModifyingValue] = useState("");

  const handleAdd = () => {
    if (currentUser === num || num === 0) return;
    setModifying(false);
    setCurrentUser(currentUser + 1);
  };

  const handleSubstract = () => {
    if (currentUser === 1) return;
    setModifying(false);
    setCurrentUser(currentUser - 1);
  };

  const onHandleModify = (newValue) => {
    setModifying(true);
    setModifyingValue(newValue);
  };

  const modifyValue = (e) => {
    e.preventDefault();

    const inputValue = e.target[0].value;

    if (modifyingValue === "fechaNac") {

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(inputValue)) {
            return;
        }
    }
    if (modifyingValue === "correoElectronico") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputValue)) {
            return;
        }
    }

    
    const newValues = {

        campo: modifyingValue,
        valor: inputValue,
        num: currentUser

    }

    axios.post('http://localhost:8080/api/postModify', newValues)
    .then(response => {
        console.log(response);
    });

    setModifying(false);

  }

  useEffect(() => {
    console.log(currentUser);
    if (num === 0) return;
    axios
      .get(`http://localhost:8080/api/getUser?num=${currentUser}`)
      .then((response) => {
        setUser(response.data);
      });
  }, [num, currentUser]);

  return (
    <>
      <div className="border mt-3 p-3">
        <h2 className="h4 text-center">Modificar usuarios</h2>
        <hr />

        <div className="d-flex justify-content-center gap-2">
          <button className="btn btn-warning" onClick={handleSubstract}>
            Anterior
          </button>
          <button className="btn btn-success" onClick={handleAdd}>
            Siguiente
          </button>
        </div>

        <div className="mt-2 row">
          {Object.entries(user).map(([campo, valor]) => (
            <UsuarioCampo
              campo={campo}
              valor={valor}
              onHandleModify={onHandleModify}
              key={campo}
            />
          ))}
        </div>

        <div>
          {modifying && (
            <form
              className="d-flex align-items-center mt-2 flex-column"
              style={{ display: "none" }}
              onSubmit={modifyValue}
            >
              <div className="form-group text-center">
                <label htmlFor="modificar">Modificar: {modifyingValue}</label>
                <input type="text" id="modificar" className="form-control" style={{textAlign: "center"}}/>
              </div>
              <div className="d-block">
                <input type="submit" className="btn btn-primary mt-2"/>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
