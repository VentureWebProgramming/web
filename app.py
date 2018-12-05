from flask import Flask, render_template, request, Response
import json
app = Flask(__name__)

from data_control import DataControl

Est = DataControl("estimation")
Job = DataControl("job")
Pet = DataControl("petition")
Rev = DataControl("reservation")

# HOME--------------------------------------------------
@app.route("/")
def index():
    return render_template("index.html")

# Intro 소개---------------------------------------------
@app.route("/intro")
def intro():
    return render_template("intro.html")

# Menu 메뉴-----------------------------------------------
@app.route("/menu")
def menu():
    return render_template("menu.html")

# Way 찾아오는길-------------------------------------------
@app.route("/way")
def way():
    return render_template("way.html")

# Estimation 평가------------------------------------------
@app.route("/estimation")
def estimation():
    return render_template("estimation.html")

@app.route("/estimation/write", methods=['POST'])
def DoEstimation():
    estimate_data = json.loads(request.data)
    return Est.saveData(estimate_data)

# Petition 청원------------------------------------------
@app.route("/petition")
def petition():
    return render_template("petition.html")

@app.route("/petition/write", methods=['POST'])
def DoPetition():
    petition_data = json.loads(request.data)
    return Pet.saveData(petition_data)

# Job 구인구직--------------------------------------------
@app.route("/job")
def job():
    return render_template("job.html")

@app.route("/job/write", methods=['POST'])
def ApplyJob():
    job_data = json.loads(request.data)
    return Job.saveData(job_data)

# Reservation 예약--------------------------------------------
@app.route("/reservation")
def reservation():
    return render_template("reservation.html")

@app.route("/reservation/reservation", methods=['POST'])
def DoReservation():
    reserve_data = json.loads(request.data)
    return Rev.saveData(reserve_data)

@app.route("/reservation/data", methods=['GET'])
def getAllData():
    return Response(response=Rev.getAllData(), status=200, mimetype='text/plain')

# Server Start
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
