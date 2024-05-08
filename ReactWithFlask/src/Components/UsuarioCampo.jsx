import React from 'react'

export const UsuarioCampo = ({campo, valor, onHandleModify}) => {
  return (
    <>
    
        <div className='col text-center border p-1 d-flex flex-column'>

            <p className='text-center'>{campo}</p>
            <hr />
            <p>{valor}</p>

            <button className='btn btn-info rounded-0 mt-auto' onClick={() => onHandleModify(campo)}>Modificar</button>

        </div>
    
    </>
  )
}
