from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import ifcopenshell
import tempfile
import os

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_ifc():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        temp_file_path = os.path.join(tempfile.gettempdir(), file.filename)
        file.save(temp_file_path)
        return jsonify({'file_path': temp_file_path})
    return jsonify({'error': 'File processing error'}), 500

@app.route('/convert', methods=['POST'])
def convert_ifc():
    data = request.get_json()
    file_path = data.get('file_path')
    if not file_path or not os.path.exists(file_path):
        return jsonify({'error': 'Invalid file path'}), 400

    # Open the IFC file and convert it to a JSON format suitable for BIM Surfer
    ifc_file = ifcopenshell.open(file_path)
    json_data = ifc_file.to_json()

    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
