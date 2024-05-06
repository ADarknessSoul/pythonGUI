from flask import Flask, jsonify, request, send_file
import pickle
import datetime
import os
from flask_cors import CORS
from docx import Document
from fpdf import FPDF

app = Flask(__name__)
cors = CORS(app, origins="*")

contador = 0

def count_files_in_folder(folder_path):
    # Get list of files in the folder
    files = os.listdir(folder_path)
    # Count the number of files
    num_files = len(files)
    return num_files


def calcularEdad(data):
    # Obtener la fecha de nacimiento de la lista de datos
    fecha_nacimiento = None
    for item in data:
        if item[0] == "fechaNacimiento":
            fecha_nacimiento = item[1]
            break
    # Calcular la edad
    fecha_actual = datetime.datetime.now().date()
    fecha_nacimiento = datetime.datetime.strptime(fecha_nacimiento, "%d/%m/%Y").date()
    edad = fecha_actual.year - fecha_nacimiento.year
    return edad

def createFile(users):
    currentNumber = count_files_in_folder("server/documents/pickles")
    currentNumber += 1
    dir = f"server\\documents\\pickles\\data{currentNumber}.pkl"
    with open(dir, "ab") as file:
        pickle.dump(users, file)
    file.close()

@app.route('/api/getMethod', methods=['GET'])
def get_users():
 
    with open("server/documents/formatoBackup.txt", "r", -1, "UTF-8") as file:
        text = file.read()

    return jsonify(
        {
            "texto": [
                text
            ]
        }   
    )

@app.route('/api/getNumberOfPickles', methods=['GET'])
def get_number_of_pickles():
    num_files = count_files_in_folder("server/documents/pickles")
    return jsonify(
        {
            "numero": num_files
        }
    )

@app.route('/api/getMethod2', methods=['GET'])
def get_combined_format():
    usuarioActual = request.args.get("usuarioActual")
    dir = f"server\\documents\\pickles\\data{usuarioActual}.pkl"
    #Deserializar la lista de datos en un archivo con pickle
    with open(dir, "rb") as file:
        data = pickle.load(file)
        #Leer el archivo formatoBackup.txt y reemplazar los valores de la lista de datos
        with open("server\\documents\\formatoBackup.txt", "r", -1, "UTF-8") as file:
            content = file.read()
            #print(content)
            for item in data:
                content = content.replace(f"[{item[0]}]", str(item[1]))
            
            edad = calcularEdad(data)
            # Agregar la edad al final de la variable content
            content += f"\nEdad: {edad}"
            file.close()

            with open("server\\documents\\formato.txt", "w", -1, "UTF-8") as file:
                file.write(content)
                file.close()

                with open("server/documents/formato.txt", "r", -1, "UTF-8") as file:
                    text = file.read()
                
                return jsonify(
                    {
                        "texto": [
                            text
                        ]
                    }
                )

@app.route('/api/getFile', methods=['GET'])
def get_file():
    return send_file("documents\\formato.txt", as_attachment=True)

@app.route('/api/postMethod', methods=['POST'])
def add_user():
    data = request.json
    # Append data in the users list
    users = []
    users.append(["nombre", data.get("Nombre")])
    users.append(["apellido1", data.get("Apellido1")])
    users.append(["apellido2", data.get("Apellido2")])
    users.append(["cargo", data.get("Cargo")])
    users.append(["empresa", data.get("Empresa")])
    users.append(["calle", data.get("Calle")])
    users.append(["numeroExt", data.get("NumExt")])
    users.append(["numeroInt", data.get("NumInt")])
    users.append(["colonia", data.get("Colonia")])
    users.append(["municipio", data.get("Municipio")])
    users.append(["estado", data.get("Estado")])
    users.append(["codigoPostal", data.get("CodigoPost")])
    users.append(["telefono", data.get("Tel")])
    users.append(["correoElectronico", data.get("email")])
    users.append(["fechaNacimiento", data.get("FechaNac")])
    
    createFile(users)

    print(data)
    return jsonify({"message": "Data received successfully"})

@app.route('/api/getDocx', methods=['GET'])
def get_docx():
    # Read the content of formato.txt
    with open("server/documents/formato.txt", "r", -1, "UTF-8") as file:
        content = file.read()
    # Create a new Word document
    doc = Document()
    # Add the content to the document
    doc.add_paragraph(content)
    # Save the document as .docx
    doc.save("server/documents/formato.docx")
    # Return the .docx file as an attachment
    return send_file("documents/formato.docx", as_attachment=True)

@app.route('/api/getPDF', methods=['GET'])
def get_pdf():
    # Read the content of formato.txt
    with open("server/documents/formato.txt", "r", -1, "UTF-8") as file:
        content = file.read()
    # Create a new PDF document
    pdf = FPDF()
    # Add a page to the document
    pdf.add_page()
    # Set the font and size
    pdf.set_font("Arial", size=12)
    # Add the content to the document
    pdf.multi_cell(0, 10, content)
    # Save the document as .pdf
    pdf.output("server/documents/formato.pdf")
    # Return the .pdf file as an attachment
    return send_file("documents/formato.pdf", as_attachment=True)

@app.route('/api/postDeleteMethod', methods=['POST'])
def delete_user():
    data = request.json
    print(data)
    usuarioActual = data.get("usuarioActual")
    dir = f"server\\documents\\pickles\\data{usuarioActual}.pkl"
    os.remove(dir)
    return jsonify({"message": "Data deleted successfully"})

@app.route('/api/postSaveMethod', methods=['POST'])
def save_format():
    data = request.json
    print(data)
    with open("server/documents/formato.txt", "w", -1, "UTF-8") as file:
        file.write(data.get("formato"))
        file.close()
    return jsonify({"message": "Data saved successfully"})


if __name__ == '__main__':
    app.run(debug=True, port=8080)