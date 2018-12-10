from flask import Flask, render_template, request, Response
import json, os, math
app = Flask(__name__)

from data_control import DataControl

Data = {}
Data["review"] = DataControl("review")
Data["recruit"] = DataControl("recruit")
Data["petition"] = DataControl("petition")
Data["reservation"] = DataControl("reservation")

@app.route("/")
def index():
    return render_template("about.html")

@app.route("/<kind>")
def rendering(kind):
    print(kind)
    if kind == "review":
        return render_template("review.html")
    return render_template(kind+".html")

@app.route("/<kind>/write", methods=['POST'])
def write(kind):
    data = json.loads(request.data)
    return Data[kind].saveData(data)

@app.route("/<kind>/rewrite", methods=['POST'])
def rewrite(kind):
    data = json.loads(request.data)
    return Data[kind].changeData(data)

@app.route("/review/data")
def getData(kind):
    return Response(response=Data[kind].getData(), status=200, mimetype='text/plain')

# Server Start
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
