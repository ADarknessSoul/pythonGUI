import { useState, useEffect } from 'react'
import React from 'react'
import { CrearArchivo } from './CrearArchivo.jsx';
import axios from 'axios';

export const PythonGUI = () => {

    const [data, setData] = useState([]);
    const [numberOfPickles, setNumberOfPickles] = useState(0);
    const [formato, setFormato] = useState([]);
    const [usuarioActual, setUsuarioActual] = useState(1);
  
    const fetchAPI = async () => {
      const response = await axios.get("http://localhost:8080/api/getMethod");
      console.log(response.data.texto);
      setData(response.data.texto);
    }
    
    const fetchNumberOfFiles = async () => {
      const response = await axios.get("http://localhost:8080/api/getNumberOfPickles");
      setNumberOfPickles(parseInt(response.data.numero))
    }

    const downloadFile = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/getFile', {
          responseType: 'blob', // Set response type to blob to handle binary data
        });
    
        // Create a blob URL from the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));
    
        // Create a temporary link element to initiate the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'formato.txt'); // Set the filename
        document.body.appendChild(link);
        link.click();
    
        // Clean up
        link.parentNode.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };
    
    useEffect(() => {
      fetchAPI();
    }, []);

    useEffect(() => {
      fetchNumberOfFiles();
    }, []);

    const handleMix = async () => {
      if(numberOfPickles === 0) return;
      const response = await axios.get(`http://localhost:8080/api/getMethod2?usuarioActual=${usuarioActual}`);
      setFormato(response.data.texto);
    }

    const handleDelete = async () => {

      const numeroUsuario = {

        usuarioActual

      }

      axios.post("http://localhost:8080/api/postDeleteMethod", numeroUsuario).then((response) => {
        console.log(response);
        fetchNumberOfFiles();
        setUsuarioActual(1);
      });
    }

    const handleAdd = () => {
      if(usuarioActual === numberOfPickles || numberOfPickles === 0) return;
      setUsuarioActual(usuarioActual + 1);
    }

    const handleSubstract = () => {
      if(usuarioActual === 1) return;
      console.log("hola")
      setUsuarioActual(usuarioActual - 1);
    }

  return (
    <>
        
        <div className='container'>

            <h1 className='h1 text-center'>Combinar correspondencia</h1>

            <CrearArchivo/>


            <div className='row mt-3 border p-2 mb-3'> 

              <div className='col-6'>

                <h2 className='h2 text-center' style={{marginBottom: 190}}>Formato plantilla</h2>
                <textarea className='form-control mb-3' rows={27} disabled value={data}></textarea>

              </div>

              <div className='col-6'>

                <h2 className='h2 text-center'>Formato combinado</h2>

                  <div className='row'>

                    <div className='col-6 d-flex justify-content-center align-items-center'>

                      <p className='mb-1 h5'>Usuario actual: <span className='bold'>{usuarioActual}</span></p>

                    </div>

                    <div className='col-6 d-flex flex-column gap-2 mb-2'>
                      

                      <button className='btn btn-warning' onClick={handleSubstract}>Anterior</button>
                      
                      <button className='btn btn-success' onClick={handleAdd}>Siguiente</button>

                      <button className='btn btn-primary' onClick={handleMix}>Combinar correspondencia</button>

                      <button className='btn btn-danger' onClick={handleDelete}>Borrar</button>

                    </div>

                  </div>

                <textarea className='form-control mb-2' rows={27} disabled value={formato}></textarea>

                <div className='d-flex justify-content-center'>

                  <button className='btn btn-primary' onClick={downloadFile}>Descargar (.txt)</button>

                </div>

              </div>

            </div>

        </div>

    </>
  )
}
