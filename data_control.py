import json, os, math

class DataControl:
    def __init__(self, path, listNum):
        self.directory = "./data/" + path
        self.successRet = '{"success": "True"}'
        self.failedRet = '{"success": "False"}'
        self.listNum = listNum

    # arg 시간, 닉네임 -> 저장된 json 파일경로 return
    def getFilenameStr(self, now, name):
        path = self.directory + "/" + now + "+" + name + ".json"
        path = path.replace(":", ",")
        return path.replace(" ", "")

    # 데이터 저장: "directory/now+name.json" 파일에 데이터 저장
    def saveData(self, data):
        try:
            f = open(self.getFilenameStr(data["now"], data["name"]), 'w')
            f.write(json.dumps(data))
            f.close()
            return self.successRet
        except IOError:
            return self.failedRet
    
    # 모든 정보 불러오기
    def getData(self, idx):
        ret = "["
        if math.ceil(len(os.listdir(self.directory))/self.listNum) < idx:
            return self.failedRet
        for filename in os.listdir(self.directory):
            try:
                f = open(self.directory+"/"+filename, 'r')
                ret += f.read()+","
                f.close()
            except IOError:
                return self.failedRet
        ret = ret[0:len(ret)-1] + "]"
        return ret

    # 비밀번호 확인
    def passwdCheck(self, now, name, passwd):
        try:
            f = open(self.getFilenameStr(now, name), 'r')
            obj = json.loads(f.read())
            f.close()
            if obj["password"] == passwd:
                return True
            else:
                return False
        except IOError:
            return False
    
    # 데이터 수정
    def changeData(self, data):
        if self.passwdCheck(data["now"], data["name"], data["password"]):
            filename = self.getFilenameStr(data["now"], data["name"])
            if os.path.isfile(filename):
                os.remove(filename)
            else:
                return self.failedRet
            return self.saveData(data)
        else:
            return self.failedRet
