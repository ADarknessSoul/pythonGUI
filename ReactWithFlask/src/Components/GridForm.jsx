import React from 'react'

export const GridForm = ({fieldName, fieldType, fieldPlaceholder, handleChange}) => {
  return (
    <>
        
        <div className='col-md-4'>

            <div className='form-group'>

            <label>{fieldName}</label>
            <input type={fieldType} className='form-control' placeholder={fieldPlaceholder} onChange={(e) => handleChange(e.target.value) }/>

            </div>     

        </div>
    
    </>
  )
}
