from flask import Flask, jsonify, request
import pickle
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins="*")

def createFile(users):
    with open("server\documents\data.pkl", "wb") as file:
        pickle.dump(users, file)
    file.close()

@app.route('/api/getMethod', methods=['GET'])
def get_users():
    return jsonify(
        {
            "users": [
                'arpan',
                'zach',
                'jessie',
            ]
        }
    )

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

    print(users)
    return jsonify({"message": "Data received successfully"})


if __name__ == '__main__':
    app.run(debug=True, port=8080)