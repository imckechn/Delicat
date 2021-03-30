# Used this tutorial: https://blog.miguelgrinberg.com/post/how-to-create-a-react--flask-project
# Didn't create a virtual environment because it was different on mac and windows, not sure
# if this will be a problem.
# to run the backend, open another terminal and either type "flask run" or "npm run start-api"
import flask
import json

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route('/test-url-please-work', methods=['GET'])
def test():
    data = {
        "TestURL": {
            "value": "https://www.youtube.com/watch?v=oHg5SJYRHA0",
        }
    }
    return data

app.run()