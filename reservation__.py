# 예약
import json, os

class Reservation:
    def __init__(self):
        self.rev_path = "./data/reservation/"
        self.ret = {"success": True}
    def GetFilePath(self, time, name):
        path = self.rev_path + time + "+" + name + ".json"
        path = path.replace(":", ",")
        return path.replace(" ","")
    def Reserve(self, data):
        try:
            f = open(self.GetFilePath(data["now"], data["name"]), 'w')
            del(data["now"])
            f.write(json.dumps(data))
            self.ret["success"] = True
            f.close()
        except IOError:
            self.ret["success"] = False
        return json.dumps(self.ret)
    def getAllData(self):
        ret = "["
        for files in os.walk("./data/reservation"):
            for fname in files:
                try:
                    f = open("./data/reservation/"+fname, 'r')
                    ret += f.read()+","
                    f.close()
                except IOError:
                    ret = '{"success":false}'
                    print("Error: " +ret)
                    return ret
        ret = ret[0:len(ret)-1] + "]"
        print(ret)
        return ret
