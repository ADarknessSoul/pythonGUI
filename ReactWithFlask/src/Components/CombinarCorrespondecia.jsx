import React, { useState } from "react";
import axios from "axios";

export const CombinarCorrespondecia = ({
  usuarioActual,
  formato,
  data,
  handleSubstract,
  handleAdd,
  handleMix,
  saveFile,
  handleDelete,
  numberOfPickles,
}) => {
  const [option, setOption] = useState("");
  const [printUsers, setPrintUsers] = useState([]);

  const downloadFile = async() => {

    try {
        // Create an array to store all download promises
        const downloadPromises = [];
    
        // Loop through each user and initiate a file download request
        printUsers.forEach(async (user) => {
          const promise = axios.get(`http://localhost:8080/api/getFile?usuarioActual=${user}`, {
            responseType: "blob", // Set response type to blob to handle binary data
          });
          downloadPromises.push(promise);
        });
    
        // Wait for all download promises to resolve
        const responses = await Promise.all(downloadPromises);
    
        // Process each response and create a download link
        responses.forEach((response, index) => {
          const user = printUsers[index];
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `formato${user}.txt`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link); // Clean up
        });
      } catch (error) {
        console.error("Error downloading files:", error);
      }
    };

  const downloadDocx = async() => {
    try {
      // Create an array to store all download promises
      const downloadPromises = [];
  
      // Loop through each user and initiate a file download request
      printUsers.forEach(async (user) => {
        const promise = axios.get(`http://localhost:8080/api/getDocx?usuarioActual=${user}`, {
          responseType: "blob", // Set response type to blob to handle binary data
        });
        downloadPromises.push(promise);
      });
  
      // Wait for all download promises to resolve
      const responses = await Promise.all(downloadPromises);
  
      // Process each response and create a download link
      responses.forEach((response, index) => {
        const user = printUsers[index];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `formato${user}.docx`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
      });
    } catch (error) {
      console.error("Error downloading files:", error);
    }
    }

  const downloadPDF = async () => {
    try {
      // Create an array to store all download promises
      const downloadPromises = [];
  
      // Loop through each user and initiate a file download request
      printUsers.forEach(async (user) => {
        const promise = axios.get(`http://localhost:8080/api/getPDF?usuarioActual=${user}`, {
          responseType: "blob", // Set response type to blob to handle binary data
        });
        downloadPromises.push(promise);
      });
  
      // Wait for all download promises to resolve
      const responses = await Promise.all(downloadPromises);
  
      // Process each response and create a download link
      responses.forEach((response, index) => {
        const user = printUsers[index];
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `formato${user}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
      });
    } catch (error) {
      console.error("Error downloading files:", error);
    }
  };

  const onHandleOption = (e) => {
    e.preventDefault();
    setPrintUsers([]);
    const optionSelected = e.target[0].value;
    setOption(optionSelected);
    if(optionSelected === "todos") {
      setPrintUsers(Array.from({ length: numberOfPickles }, (_, index) => index + 1));
    }
  };

  const OnHandleSingleAdd = (e) => {
    e.preventDefault();
    const userSelected = e.target[0].value;
    setPrintUsers([parseInt(userSelected)]);
  };

  const onHandleMultipleAdd = (e) => {   
    e.preventDefault();
    const userSelected = e.target[0].value;
    if (printUsers.includes(parseInt(userSelected))) return;
    setPrintUsers([...printUsers, parseInt(userSelected)]);
  }

  const onHandleRemoveUsers = () => {
    setPrintUsers([]);
  }

  console.log(printUsers);

  return (
    <>
      <div className="row mt-3 border p-2 mb-3">
        <div className="col-6">
          <h2 className="h2 text-center" style={{ marginBottom: 145 }}>
            Formato plantilla
          </h2>
          <textarea
            className="form-control mb-3"
            rows={27}
            disabled
            value={data}
          ></textarea>
        </div>

        <div className="col-6">
          <h2 className="h2 text-center">Formato combinado</h2>

          <div className="row">
            <div className="col-6 d-flex justify-content-center align-items-center">
              <p className="mb-1 h5">
                Usuario actual: <span className="bold">{usuarioActual}</span>
              </p>
            </div>

            <div className="col-6 d-flex flex-column gap-2 mb-2">
              <button className="btn btn-warning" onClick={handleSubstract}>
                Anterior
              </button>

              <button className="btn btn-success" onClick={handleAdd}>
                Siguiente
              </button>

              <button className="btn btn-primary" onClick={handleMix}>
                Combinar correspondencia
              </button>
            </div>
          </div>

          <textarea
            className="form-control mb-2"
            rows={27}
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            disabled={formato === ""}
          ></textarea>

          <div className="d-flex justify-content-center gap-2">
            <button
              className="btn btn-secondary"
              onClick={saveFile}
              disabled={formato === ""}
            >
              Guardar
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              disabled={formato === ""}
            >
              Borrar
            </button>
          </div>
        </div>
      </div>

      {/* Sección descargar */}

      <div className="container mt-3 mb-2 border p-3">
        <h2 className="h4 text-center mb-3">Descargar</h2>
        <hr />

        <div>
          <form
            className="d-flex justify-content-center"
            onSubmit={onHandleOption}
          >
            <div className="form-group text-center w-25 mb-3">
              <label className="mb-2">Elegir formato de impresión</label>
              <select className="form-control">
                <option value="uno" defaultValue style={{textAlign: "center"}}>
                  Imprimir uno
                </option>
                <option value="varios" style={{textAlign: "center"}}>Imprimir varios</option>
                <option value="todos" style={{textAlign: "center"}}>Imprimir todos</option>
              </select>

              <input
                type="submit"
                className="btn btn-primary mt-2 col-12"
                value="Elegir"
              />
            </div>
          </form>

          <hr />
        </div>

        <div>
          {option === "uno" && numberOfPickles ? (
            <>
              <div className="d-flex justify-content-center">
                <form className="w-25 text-center" onSubmit={OnHandleSingleAdd}>
                  <p>Selecciona un usuario</p>
                  <select className="form-control">
                    {Array.from({ length: numberOfPickles }, (_, index) => (
                      <option
                        key={index + 1}
                        value={index + 1}
                        style={{ textAlign: "center" }}
                      >
                        Usuario {index + 1}
                      </option>
                    ))}
                  </select>
                  <input
                    type="submit"
                    className="btn btn-primary col-12 mt-2"
                  />
                </form>
              </div>

              <hr />
            </>
          ) : option === "varios" && numberOfPickles ? (
            <>
            <div className="d-flex justify-content-center">
              <form className="w-25 text-center" onSubmit={onHandleMultipleAdd}>
                <p>Selecciona los usuarios</p>
                <select className="form-control">
                  {Array.from({ length: numberOfPickles }, (_, index) => (
                    <option
                      key={index + 1}
                      value={index + 1}
                      style={{ textAlign: "center" }}
                    >
                      Usuario {index + 1}
                    </option>
                  ))}
                </select>
                <input
                  type="submit"
                  className="btn btn-primary col-12 mt-2"
                />
                <button className="btn btn-danger mt-2 col-12" onClick={onHandleRemoveUsers} type="button">Vaciar</button>
              </form>
            </div>

            <hr />
          </>
          ) : null}
        </div>

        {option && (
          <p className="text-center">
            Se imprimirá: <span>{printUsers.map((value) => (
                <span key={value}>|Usuario {value}| </span>
            ))}</span>
          </p>
        )}

        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn btn-light"
            onClick={downloadFile}
            disabled={printUsers.length === 0}
          >
            Descargar (.txt)
          </button>
          <button
            className="btn btn-primary"
            onClick={downloadDocx}
            disabled={printUsers.length === 0}
          >
            Descargar (.docx)
          </button>
          <button
            className="btn btn-dark"
            onClick={downloadPDF}
            disabled={printUsers.length === 0}
          >
            Descargar (.pdf)
          </button>
        </div>
      </div>
    </>
  );
};
