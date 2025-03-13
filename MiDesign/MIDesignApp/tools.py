import json
import time
import uuid
import datetime
from enum import Enum
from SysModel.models import MaterialClassiication


class SettingType(Enum):
    """系统内置的类型"""
    软件类型 = 1,
    服务器类型 = 1


def getuuid():
    uid = str(uuid.uuid4())
    suid = ''.join(uid.split('-'))
    return suid


def TimeStampToTime(timestamp):
    timeStruct = time.localtime(timestamp)
    return time.strftime('%Y-%m-%d %H:%M:%S', timeStruct)


def createmenu(data, pid):
    """根据当前数据迭代生成菜单数据"""
    nodes = data.filter(pid=pid)
    nodemenu = []
    if nodes:
        for sonodemenu in nodes:
            if data.filter(pid=sonodemenu["id"]):
                chidmenu = []
                chidmenu = createmenu(data, sonodemenu["id"])
                menu = {
                    "title": sonodemenu["title"],
                    "icon": "fa " + sonodemenu["icon"],
                    "href": "" if sonodemenu["href"] == "#" else sonodemenu["href"],
                    "target": "_self",
                    "child": chidmenu
                }
            else:
                menu = {
                    "title": sonodemenu["title"],
                    "icon": "fa " + sonodemenu["icon"],
                    "href": "" if sonodemenu["href"] == "#" else sonodemenu["href"],
                    "target": "_self"
                }

            nodemenu.append(menu)

        pass
    else:
        pass

    return nodemenu


class JsonResult:
    def __init__(self, data):
        self.data = {
            "status": 200,
            "msg": ''
        }


class PageHelp:
    """分页帮助类"""

    def getOptions(optionstr):
        """返回搜索条件"""
        parms = {}
        if optionstr:
            # 定义搜索条件
            dicoptions = eval(optionstr)
            for item in dicoptions.keys():
                if dicoptions[item]:
                    if 'date' in item:
                        print("日期搜索")
                        daterange = dicoptions[item].split(' - ')
                        parms[item + "__gte"] = daterange[0]
                        parms[item + "__lte"] = daterange[1]
                    else:
                        parms[item + "__icontains"] = dicoptions[item]

        return parms


class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime.datetime):
            return obj.strftime("%Y-%m-%d %H:%M:%S")
        else:
            return json.JSONEncoder.default(self, obj)


def recursion_func(id):

    # 传入一个id获取当前id的模型类对象,
    mater = MaterialClassiication.objects.get(id=id)
    # 获取当前模型类对象下的所以子对象
    set_data = MaterialClassiication.objects.filter(pid_id=mater.id)
    print(mater.classificationname + ':被删除')
    mater.delete()
    if set_data:
        for i in set_data:
            print(i)
            recursion_func(i.id)
    else:
        return print('ok')


def judgment_func(id, pid):

    mate = MaterialClassiication.objects.get(id=id)
    if mate.id == pid:
        return 0
    sum = 200
    mater = MaterialClassiication.objects.filter(pid_id=id)
    if mater:
        for i in mater:
            if i.id == int(pid):
                sum = 0
                return sum
            else:
                ter = judgment_func(i.id, pid)
                if ter == 0:
                    return ter
                else:
                    continue
        return sum
    else:
        return sum

