import json, os, math

class DataControl:
    def __init__(self, kind):
        self.kind = kind
        self.directory = "./data/" + kind
        self.successRet = '{"success": true}'
        self.failedRet = '{"success": false}'

    # arg 시간, 닉네임 -> 저장된 json 파일경로 return
    def getFilenameStr(self, now, name):
        path = self.directory + "/" + now + "+" + name + ".json"
        path = path.replace(":", ",")
        return path.replace(" ", "")

    # 데이터 저장: "directory/now+name.json" 파일에 데이터 저장
    def saveData(self, data):
        try:
            if self.kind == "reservation" and not self.checkReservation(data):
                return self.failedRet
            f = open(self.getFilenameStr(data["now"], data["name"]), 'w')
            f.write(json.dumps(data))
            f.close()
            return self.successRet
        except IOError:
            return self.failedRet
        
    # 예약 시간이 비어있는지 확인
    def checkReservation(self, data):
        if os.path.exists(self.directory):
            for filename in os.listdir(self.directory):
                try:
                    f = open(self.directory+"/"+filename, 'r')
                    obj = json.load(f)
                    f.close()
                    if obj["reserveTime"] == data["reserveTime"]:
                        return False
                except IOError:
                    return False
        return True

    # 후기 삭제
    def deleteReview(self, data):
        try:
            filename = os.listdir(self.directory)[data["id"]]
        except IndexError:
            return self.failedRet
        try:
            f = open(self.directory+"/"+filename, 'w')
            obj = json.load(f)
            f.close()
            if obj["password"] == data["password"]:
                os.remove(self.directory+"/"+filename)
                return self.successRet
        except IOError:
            return self.failedRet
        return self.failedRet
    
    # 모든 정보 불러오기
    def getData(self):
        ret = "["
        for filename in os.listdir(self.directory):
            try:
                f = open(self.directory+"/"+filename, 'r')
                ret += f.read()+","
                f.close()
            except IOError:
                return self.failedRet
        ret = ret[0:len(ret)-1] + "]"
        print(ret)
        return ret
