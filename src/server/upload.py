import pandas as pd
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'xls', 'xlsx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024  # 5MB file size limit

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validate_excel_data(data):
    required_columns = ['Team Name', 'League']
    
    if not all(col in data.columns for col in required_columns):
        raise ValueError('Invalid file format. Missing required columns.')
    
    if data['League'].isnull().any():
        raise ValueError('All teams must have a league assigned.')
    
    return True

@app.route('/upload', methods=['POST'])
def upload_excel():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        
        file = request.files['file']
        
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Only Excel files are allowed.'}), 400

        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(filepath)

        try:
            data = pd.read_excel(filepath)
            validate_excel_data(data)
            leagues = data.groupby('League')['Team Name'].apply(list).to_dict()
            
            return jsonify({
                'success': 'Leagues created',
                'leagues': leagues
            }), 200
            
        except Exception as e:
            return jsonify({'error': str(e)}), 400
            
        finally:
            if os.path.exists(filepath):
                os.remove(filepath)
                
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)