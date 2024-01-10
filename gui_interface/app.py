from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__, template_folder="templates")

class NormBertPage:
    df_file: pd.DataFrame

    def __init__(self):
        self.app = Flask(__name__)
        self.uploaded_df = None

        # Define routes
        self.app.add_url_rule('/', 'index', self.index)
        self.app.add_url_rule('/upload', 'upload', self.upload, methods=['POST'])
        self.app.add_url_rule('/process_data', 'process_data', self.process_data, methods=['POST'])
        self.df_file = None

    def run(self):
        self.app.run(debug=True)

    @staticmethod
    def index():
        return render_template('index.html')

    def upload(self):
        files = request.files.getlist('fileInput')
        # Use the first row of the first file as the list
        if files:
            df = pd.read_csv(files[0])
            self.df_file = df
            # Extract header values
            list_data = df.iloc[:, 0]
            return render_template('index.html', list_data=list_data)
        return render_template('index.html')

    def process_data(self):
        input_1 = request.form['norm_input']

        # Process the input data using your custom function
        # TODO: call model here
        results = None

        return render_template('index.html', result=results)


if __name__ == '__main__':
    page = NormBertPage()
    page.run()
