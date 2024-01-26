from flask import Flask, request, jsonify
from ...auxiliary import gpt_promt, request_gpt

app = Flask(__name__)


@app.route('/process', methods=['POST'])
def process_data():
    norm_type = request.json["method"]
    text = request.json["maualText"]

    promt = gpt_promt({"text": text}, target=norm_type, testing=True)["messages"]
    response = request_gpt(promt, norm_type)

    result = {'status': 'success', 'data': response}
    return jsonify(result)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
