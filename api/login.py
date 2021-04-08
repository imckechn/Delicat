import json
import os
import sys
import flask
from flask import request, redirect, jsonify, make_response

def login(error, email, password):
	if request.method == 'OPTIONS':
		return _build_cors_prelight_response()
	elif request.method == 'POST':
		if email != 'admin@gmail.com' or password != 'admin':
			error = 'Invalid Credenitials. Please try again.'
		else:
			return _corsify_actual_response(jsonify(validated=True))

	return _corsify_actual_response(jsonify(validated=False))

def _build_cors_prelight_response():
	response = make_response()
	response.headers.add("Access-Control-Allow-Origin", "*")
	response.headers.add('Access-Control-Allow-Headers', "*")
	response.headers.add('Access-Control-Allow-Methods', "*")
	return response

def _corsify_actual_response(response):
	response.headers.add("Access-Control-Allow-Origin", "*")
	return response