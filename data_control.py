# 예약
import json, os

class DataControl:
    def __init__(self, path):
        self.directory = "./data/" + path
        self.successRet = '{"success": "True"}'
        self.failedRet = '{"success": "False"}'

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
    def getAllData(self):
        print(os.listdir(self.directory))
        ret = "["
        for filename in os.listdir(self.directory):
            print(filename)
            try:
                f = open(self.directory+"/"+filename, 'r')
                ret += f.read()+","
                f.close()
            except IOError:
                return self.failedRet
        ret = ret[0:len(ret)-1] + "]"
        print(type(ret))
        print(ret)
        return ret

    # 비밀번호 확인
    def passwdCheck(self, now, name, passwd):
        try:
            f = open(self.getFilenameStr(now, name), 'r')
            obj = json.loads(f.read())
            f.close()
            if obj["passwd"] == passwd:
                return True
            else:
                return False
        except IOError:
            return False
    
    # 데이터 수정
    def changeData(self, pnow, pname, ppasswd, data):
        if self.passwdCheck(pnow, pname, ppasswd):
            filename = self.getFilenameStr(pnow, pname)
            if os.path.isfile(filename):
                os.remove(filename)
            else:
                return self.failedRet
            return self.saveData(data)
        else:
            return self.failedRet
