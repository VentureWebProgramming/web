from flask import Flask, render_template
app = Flask(__name__)

import petition__, reservation__
from estandjob__ import EstAndJob

Est = EstAndJob("estimation")
Job = EstAndJob("job")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/intro")         # 소개 - 카페 풍경
def intro():
    return render_template("intro.html")

@app.route("/menu")          # 메뉴
def menu():
    return render_template("menu.html")

@app.route("/way")           # 찾아오는길
def way():
    return render_template("way.html")

@app.route("/estimation")    # 평가(후기)
def estimation():
    return render_template("estimation.html")

@app.route("/petition")      # 청원
def petition():
    return render_template("petition.html")

@app.route("/job")           # 구인구직
def job():
    return render_template("job.html")

@app.route("/reservation")   # 예약
def reservation():
    return render_template("reservation.html")

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
