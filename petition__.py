# 청원
import json

class Petition:
    def __init__(self):
        self.data = {}
    def SetData(self, data):
        self.data = data
    def Reserve(self):
        ret = {"success": True}
        return json.dumps(ret)
