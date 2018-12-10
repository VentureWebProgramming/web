from flask import Flask, render_template, request, Response
import json, os, math
app = Flask(__name__)

from data_control import DataControl

listNum = 5

Data = {}
Data["review"] = DataControl("review", listNum)
Data["recruit"] = DataControl("recruit", listNum)
Data["petition"] = DataControl("petition", listNum)
Data["reservation"] = DataControl("reservation", listNum)

@app.route("/")
def index():
    return render_template("about.html")

@app.route("/<kind>")
def rendering(kind):
    print(kind)
    if os.path.exists("./data/"+kind+"/"):
        return render_template(kind+".html", length=math.ceil(len(os.listdir("./data/"+kind))/listNum))
    return render_template(kind+".html")

@app.route("/<kind>/write", methods=['POST'])
def write(kind):
    print("write")
    data = json.loads(request.data)
    return Data[kind].saveData(data)

@app.route("/<kind>/rewrite", methods=['POST'])
def rewrite(kind):
    print("rewrite")
    data = json.loads(request.data)
    return Data[kind].changeData(data)

@app.route("/<kind>/data/<idx>")
def getData(kind, idx):
    print("data")
    return Response(response=Data[kind].getData(idx), status=200, mimetype='text/plain')

# Server Start
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
