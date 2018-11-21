# 평가
import os

class Estimation:
    def __init__(self):
        EstimationData = {}
    def SaveEstimation(self, name, time, passwd, content):
        f = open(name + time, 'r')
        f.write(name+time+"\n"+passwd+"\n"+content)
        return
    def ChangeEstimation(self, name, time, passwd, content):
        f = open(name + time, 'r')
        f.write(name+time+"\n"+passwd+"\n"+content)
    def CheckPassword(self, name, time, passwd):
        f = open(name + time, 'w')