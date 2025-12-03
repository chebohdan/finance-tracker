from flask import Flask, request, jsonify
from expense_categorization_model import predict
from categories import CATEGORIES


app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict_category():
    data = request.get_json()
    expense_name = data["transaction"]
    category_id = int(predict(expense_name))
    category_name = CATEGORIES[category_id]
    print(category_name)
    return jsonify({
        "category_name": category_name,
        "transactionName": expense_name
    })

if __name__ == '__main__':
    app.run(debug=True)