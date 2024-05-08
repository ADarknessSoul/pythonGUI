import { useState, useEffect } from "react";
import React from "react";
import { CrearArchivo } from "./CrearArchivo.jsx";
import axios from "axios";
import { CombinarCorrespondecia } from "./CombinarCorrespondecia.jsx";
import { ModUser } from "./ModUser.jsx";

export const PythonGUI = () => {
  const [data, setData] = useState("");
  const [numberOfPickles, setNumberOfPickles] = useState(0);
  const [formato, setFormato] = useState("");
  const [usuarioActual, setUsuarioActual] = useState(1);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api/getMethod");
    setData(response.data.texto);
  };

  const fetchNumberOfFiles = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/getNumberOfPickles"
    );
    setNumberOfPickles(parseInt(response.data.numero));
  };

  const downloadFile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getFile", {
        responseType: "blob", // Set response type to blob to handle binary data
      });

      // Create a blob URL from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "formato.txt"); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const downloadDocx = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getDocx", {
        responseType: "blob", // Set response type to blob to handle binary data
      });

      // Create a blob URL from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "formato.docx"); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/getPDF", {
        responseType: "blob", // Set response type to blob to handle binary data
      });

      // Create a blob URL from the response data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary link element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "formato.pdf"); // Set the filename
      document.body.appendChild(link);
      link.click();

      // Clean up
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const saveFile = async () => {
    const changedFormat = {
      formato,
    };

    axios
      .post("http://localhost:8080/api/postSaveMethod", changedFormat)
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  useEffect(() => {
    fetchNumberOfFiles();
  }, []);

  const handleMix = async () => {
    if (numberOfPickles === 0) return;
    const response = await axios.get(
      `http://localhost:8080/api/getMethod2?usuarioActual=${usuarioActual}`
    );
    setFormato(response.data.texto);
  };

  const handleDelete = async () => {
    const numeroUsuario = {
      usuarioActual,
    };

    axios
      .post("http://localhost:8080/api/postDeleteMethod", numeroUsuario)
      .then((response) => {
        console.log(response);
        fetchNumberOfFiles();
        setUsuarioActual(1);
      });
  };

  const handleAdd = () => {
    if (usuarioActual === numberOfPickles || numberOfPickles === 0) return;
    setUsuarioActual(usuarioActual + 1);
  };

  const handleSubstract = () => {
    if (usuarioActual === 1) return;
    setUsuarioActual(usuarioActual - 1);
  };

  return (
    <>
      <div className="container">
        <h1 className="h1 text-center">Combinar correspondencia</h1>

        <CrearArchivo />

        <ModUser num={numberOfPickles}/>

        <CombinarCorrespondecia
          usuarioActual={usuarioActual}
          formato={formato}
          data={data}
          handleSubstract={handleSubstract}
          handleAdd={handleAdd}
          handleMix={handleMix}
          downloadFile={downloadFile}
          downloadDocx={downloadDocx}
          downloadPDF={downloadPDF}
          saveFile={saveFile}
          handleDelete={handleDelete}
          numberOfPickles={numberOfPickles}
        />
      </div>
    </>
  );
};
