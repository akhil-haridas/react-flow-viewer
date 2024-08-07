from flask import Flask, request, jsonify
import ifcopenshell

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_ifc():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file:
        ifc_file = ifcopenshell.open(file)
        # Extract some data from the IFC file as an example
        project = ifc_file.by_type("IfcProject")[0]
        project_info = {
            'name': project.Name,
            'description': project.Description
        }
        return jsonify(project_info)
    return jsonify({'error': 'File processing error'}), 500

if __name__ == '__main__':
    app.run(debug=True)
