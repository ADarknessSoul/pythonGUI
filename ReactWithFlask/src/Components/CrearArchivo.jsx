import React, { useState } from "react";
import { GridForm } from "./GridForm";
import axios from "axios";

export const CrearArchivo = () => {
  const [Nombre, setNombre] = useState("");
  const [Apellido1, setApellido1] = useState("");
  const [Apellido2, setApellido2] = useState("");
  const [Cargo, setCargo] = useState("");
  const [Empresa, setEmpresa] = useState("");
  const [Calle, setCalle] = useState("");
  const [NumExt, setNumExt] = useState(0);
  const [NumInt, setNumInt] = useState(0);
  const [Colonia, setColonia] = useState("");
  const [Municipio, setMunicipio] = useState("");
  const [Estado, setEstado] = useState("");
  const [CodigoPost, setCodigoPost] = useState(0);
  const [Tel, setTel] = useState(0);
  const [email, setEmail] = useState("");
  const [FechaNac, setFechaNac] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Nombre,
      Apellido1,
      Apellido2,
      Cargo,
      Empresa,
      Calle,
      NumExt,
      NumInt,
      Colonia,
      Municipio,
      Estado,
      CodigoPost,
      Tel,
      email,
      FechaNac,
    };

    axios
      .post("http://localhost:8080/api/postMethod", formData)
      .then((response) => {
        console.log(response);
      });
  };

  const handleDate = (date) => {
    const formattedDate = new Date(date).toLocaleDateString("en-GB");
    setFechaNac(formattedDate);
  };

  return (
    <>
      <div>

        <form className="border p-3" onSubmit={handleSubmit}>

            <legend className="h4 text-center">Crear archivos</legend>
            <hr />

          <div className="row gy-3">
            <GridForm
              fieldName="Nombre"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu nombre"}
              handleChange={setNombre}
            />
            <GridForm
              fieldName="Apellido materno"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu apellido"}
              handleChange={setApellido1}
            />
            <GridForm
              fieldName="Apellido materno"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu apellido"}
              handleChange={setApellido2}
            />
            <GridForm
              fieldName="Cargo"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu cargo"}
              handleChange={setCargo}
            />
            <GridForm
              fieldName="Empresa"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu empresa"}
              handleChange={setEmpresa}
            />
            <GridForm
              fieldName="Calle"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu calle"}
              handleChange={setCalle}
            />
            <GridForm
              fieldName="Número exterior"
              fieldType="number"
              fieldPlaceholder={"Ingresa tu número exterior"}
              handleChange={setNumExt}
            />
            <GridForm
              fieldName="Número interior"
              fieldType="number"
              fieldPlaceholder={"Ingresa tu número interior"}
              handleChange={setNumInt}
            />
            <GridForm
              fieldName="Colonia"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu colonia"}
              handleChange={setColonia}
            />
            <GridForm
              fieldName="Municipio"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu municipio"}
              handleChange={setMunicipio}
            />
            <GridForm
              fieldName="Estado"
              fieldType="text"
              fieldPlaceholder={"Ingresa tu estado"}
              handleChange={setEstado}
            />
            <GridForm
              fieldName="Código postal"
              fieldType="number"
              fieldPlaceholder={"Ingresa tu código postal"}
              handleChange={setCodigoPost}
            />
            <GridForm
              fieldName="Teléfono"
              fieldType="tel"
              fieldPlaceholder={"Ingresa tu teléfono"}
              handleChange={setTel}
            />
            <GridForm
              fieldName="Correo electrónico"
              fieldType="email"
              fieldPlaceholder={"Ingresa tu email"}
              handleChange={setEmail}
            />
            <GridForm
              fieldName="Fecha de nacimiento"
              fieldType="date"
              fieldPlaceholder={"Ingresa tu fecha de nacimiento"}
              handleChange={handleDate}
            />
          </div>

          <div className="d-flex justify-content-center">
            <input type="submit" className="btn btn-primary col-12 mt-5" />
          </div>
        </form>
      </div>
    </>
  );
};
