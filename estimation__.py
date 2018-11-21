# 평가
import os
import json

class Estimation:
    def __init__(self):
        self.EstimationData = {"idNum__": 0}

    def SaveEstimation(self, name, time, passwd, content, score):
        f = open("./data/estimation/" + name + "+" + time + ".json", 'w')
        f.write('{"name":"'+name+'","time":"'+time+'","passwd":"'+passwd+'","content":"'+content+'","score":"'+score+'"}')

    def ChangeEstimation(self, name, time1, time2, passwd, content, score):
        if os.path.isfile("./data/estimation/" + name + "+" + time1 + ".json"):
            os.remove("./data/estimation/" + name + "+" + time1 + ".json")
        f = open("./data/estimation/" + name + "+" + time2 + ".json", 'w')
        f.write('{"name":"'+name+'","time":"'+time2+'","passwd":"'+passwd+'","content":"'+content+'","score":"'+score+'"}')

    def CheckPassword(self, name, time, passwd):
        f = open("./data/estimation/" + name + "+" + time + ".json", 'r')
        return json.loads(f.read())["passwd"] == passwd
    
est = Estimation()
est.SaveEstimation("aa", "123", "aj2ik", "Hihi", "5")
est.ChangeEstimation("aa", "123", "234", "aj2ik", "Hello", "4")
print(est.CheckPassword("aa", "123", "aj2ik"))
print(est.CheckPassword("aa", "123", "ajs"))
