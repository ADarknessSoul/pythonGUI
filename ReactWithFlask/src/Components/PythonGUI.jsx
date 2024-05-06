import { useState, useEffect } from 'react'
import React from 'react'
import { GridForm } from './GridForm.jsx'
import { CargarArchivo } from './CargarArchivo.jsx';
import { CrearArchivo } from './CrearArchivo.jsx';
import axios from 'axios';

export const PythonGUI = () => {

    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [option, setOption] = useState(1);
  
    const fetchAPI = async () => {
      const response = await axios.get("http://localhost:8080/api/getMethod");
      console.log(response.data.users);
      // const response = await fetch("http://localhost:8080/api/getMethod");
      // const data = await response.json();
      // const { users } = data;
      // console.log(users);
      // setData(users);
      setData(response.data.users);
    }
  
    useEffect(() => {
      fetchAPI();
    }, [])

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
            
            {

              JSON.stringify(data)

            }

        </div>

    </>
  )
}
