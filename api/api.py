# Used this tutorial: https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
# Didn't create a virtual environment because it was different on mac and windows, not sure
# if this will be a problem.
# to run the backend, open another terminal and either type "flask run" or "npm run start-api"
import flask
from flask import request
import json
from flyering import get_flyer
from stores import list_all_stores
from send_email import send_pdf_email

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/optimize-list', methods=['POST'])
def optimize_list():
    shopping_list = request.get_json().get('shopping_list', {})
    return json.dumps(get_flyer(shopping_list))

@app.route('/stores', methods=['POST'])
def get_stores():
    return json.dumps(list_all_stores())

@app.route('/email', methods=['POST'])
def send_flyer_email():
    email_address = request.get_json().get('email_address', None)
    flyer_pdf = request.get_json().get('flyer_pdf', None)
    body = request.get_json().get('body', None)
    subject = request.get_json().get('subject', None)
    print(request.get_json())
    send_pdf_email(email_address, flyer_pdf, body, subject)
    return json.dumps("Okay")

if __name__ == '__main__':
    app.run()
