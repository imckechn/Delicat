# Used this tutorial: https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
# Didn't create a virtual environment because it was different on mac and windows, not sure
# if this will be a problem.
# to run the backend, open another terminal and either type "flask run" or "npm run start-api"
import flask
from flask import request
import json
from flyering import get_flyer

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/optimize-list/<shopping_list>', methods=['GET', 'POST'])
def optimize_list(shopping_list):
    print(shopping_list)
    return json.dumps("TEST")#get_flyer(json.loads(shopping_list))

if __name__ == '__main__':
    app.run()