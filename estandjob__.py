# 평가 및 구인구직 (estimation + job)
import os
import json

class EstAndJob:
    def __init__(self, str):
        self.Data = {"idNum__": 0}
        self.str = str

    def GetFilePath(self, time, name):
        return "./data/" + self.str + "/" + str(time) + "+" + name + ".json"

    def SaveData(self, time, name, passwd, content, score):
        f = open(self.GetFilePath(time, name), 'w')
        obj = {"time": time, "name": name, "passwd": passwd, "content": content, "score": score}
        f.write(json.dumps(obj))
        f.close()

    def ChangeData(self, time1, time2, name, passwd, content, score):
        if os.path.isfile(self.GetFilePath(time1, name)):
            os.remove(self.GetFilePath(time1, name))
        f = open(self.GetFilePath(time2, name), 'w')
        obj = {"time": time2, "name": name, "passwd": passwd, "content": content, "score": score}
        f.write(json.dumps(obj))
        f.close()

    def CheckPassword(self, time, name, passwd):
        if os.path.isfile(self.GetFilePath(time, name)):
            f = open(self.GetFilePath(time, name), 'r')
            SavedPasswd = json.loads(f.read())["passwd"]
            f.close()
            return SavedPasswd == passwd
        else:
            return False
    
Est = EstAndJob("estimation")
Est.SaveData(123, "aa", "aj2ik", "Hihi", 5)
Est.ChangeData(123, 234, "aa", "aj2ik", "Hello", 4)
print(Est.CheckPassword(234, "aa", "aj2ik"))
print(Est.CheckPassword(234, "aa", "ajs"))
