# 예약
import json, os

class Reservation:
    def __init__(self):
        self.rev_path = "./data/reservation/"
        self.ret = {"success": "True"}
    def GetFilePath(self, time, name):
        return self.rev_path + time + "+" + name + ".json"
    def Reserve(self, data):
        try:
            f = open(self.GetFilePath(data["now"], data["name"]), 'w')
            del(data["now"])
            f.write(json.dumps(data))
            self.ret["success"] = True
        except IOError:
            self.ret["success"] = False
        return json.dumps(self.ret)

Rev = Reservation()
obj = {
    "now": "10",
    "name": "HIHI",
    "people": 2,
    "reserveTime": "11"
}
Rev.Reserve(obj)