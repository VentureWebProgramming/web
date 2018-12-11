from flask import Flask, render_template, request, Response
from flask_mail import Mail, Message
import json, os, math

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.naver.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'terranada@naver.com'
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail = Mail(app)
mail.init_app(app)

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
    if kind == "reservation":
        date = data["reserveTime"].split('-')
        msg = Message('다향만당 예약 확인 메일입니다',
                      sender="terranada@naver.com",
                      recipients=[data["email"]])
        msg.body = date[0]+'년'+date[1]+'시'+date[2]+'분에 예약되었습니다.\n 예약해주셔서 감사합니다'
        mail.send(msg)
    return Data[kind].saveData(data)

@app.route("/review/data")
def getData():
    data = Data["review"].getData()
    print(data)
    return Response(response=data, status=200, mimetype='text/plain')

@app.route("/review/delete", methods=['POST'])
def deleteReview():
    data = json.loads(request.data)
    return Data["review"].deleteReview(data)

# Server Start
if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
