import { useState, useEffect } from 'react'
import React from 'react'
import { GridForm } from './GridForm.jsx'
import { CargarArchivo } from './CargarArchivo.jsx';
import { CrearArchivo } from './CrearArchivo.jsx';
import axios from 'axios';

export const PythonGUI = () => {

    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [numberOfPickles, setNumberOfPickles] = useState(0);
    const [formato, setFormato] = useState([]);
    const [option, setOption] = useState(1);
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

            <div className='d-flex justify-content-center mb-3 mt-3'>

              <button className='btn btn-primary rounded-0' onClick={() => setOption(0)}>Cargar archivo</button>
              <button className='btn btn-secondary rounded-0' onClick={() => setOption(1)}>Crear archivo</button>

            </div>

            {

              option === 1 ? <CrearArchivo /> : <CargarArchivo />

            }

            <div className='row mt-3 border p-2 mb-3'> 

              <div className='col-6'>

                <h2 className='h2 text-center' style={{marginBottom: 144}}>Formato plantilla</h2>
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

                      <button className='btn btn-danger'>Borrar</button>

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
