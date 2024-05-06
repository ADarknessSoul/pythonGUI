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

                    <div className='col-6 d-flex flex-column gap-2'>
                      

                      <button className='btn btn-warning' onClick={handleSubstract}>Anterior</button>
                      
                      <button className='btn btn-success' onClick={handleAdd}>Siguiente</button>

                      <button className='btn btn-primary' onClick={handleMix}>Combinar correspondencia</button>

                      <button className='btn btn-danger' onClick={handleDelete}>Borrar</button>

                    </div>

                  </div>

                  <div className='d-flex justify-content-center align-items-center mb-2'>

                    

                  </div>

                <textarea className='form-control mb-3' rows={27} disabled value={formato}></textarea>

              </div>

            </div>

        </div>

    </>
  )
}
