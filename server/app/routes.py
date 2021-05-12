import json
import os
import re
from app import app, jsonify, request
from .models import University
from .utils import paginate_result, sanitize_string


@app.route("/api/universities",   methods=["POST", "GET"])
def universities():

    if request.method == "POST":
        request_data = request.get_json()

        alpha_code = request_data["alpha_code"]
        country = request_data["country"]
        domain = request_data["domain"]
        name = request_data["name"]
        web_page = request_data["web_page"]

        new_university = University(
            alpha_code, country, domain, name, web_page)

        with open(os.path.join("data.json"), "r") as jsonfile:
            universities = json.loads(jsonfile.read())
            universities.append(new_university)

        return jsonify(universities)

    else:

        with open(os.path.join("data.json"), "r") as jsonfile:
            filtered_universities = []
            universities = json.loads(jsonfile.read())

            paginated_universities = paginate_result(universities,
                                                     start=request.args.get(
                                                         "start", 1),
                                                     limit=request.args.get("limit", 5))

            data = paginated_universities["results"]
            for university in range(len(data)):
                for param in request.args:
                    if param != "limit" and param != "start":
                        if re.search(sanitize_string(request.args[param]), sanitize_string(data[university][param])):

                            filtered_universities.append(data[university])
                            paginated_universities["results"] = filtered_universities

        return jsonify(paginated_universities)


@ app.route("/api/universities/<university_name>",  methods=["PATCH", "DELETE", "GET"])
def university(university_name):

    if request.method == "PATCH":
        request_data = request.get_json()
        response = None

        with open(os.path.join("data.json"), "r") as jsonfile:
            universities = json.loads(jsonfile.read())

            for university in range(len(universities)):
                if sanitize_string(universities[university]["name"]) == sanitize_string(university_name):
                    response = universities[university]
                    for update_key in request_data:
                        response[update_key] = request_data[update_key]

        return jsonify(response)

    elif request.method == "DELETE":
        response = []
        with open(os.path.join("data.json"), "r") as jsonfile:
            universities = json.loads(jsonfile.read())

            for university in range(len(universities)):
                if sanitize_string(universities[university]["name"]) != sanitize_string(university_name):
                    response.append(universities[university])
        return jsonify(response)

    else:
        response = None
        with open(os.path.join("data.json"), "r") as jsonfile:
            universities = json.loads(jsonfile.read())

            for university in range(len(universities)):
                if sanitize_string(universities[university]["name"]) == sanitize_string(university_name):
                    response = universities[university]
        return jsonify(response)
