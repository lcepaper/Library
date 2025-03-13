import json
import os

import time
import operator
from django.contrib.auth.hashers import make_password, check_password
from django.db import transaction
from django.db.models import F, Q

from django.http import HttpResponseRedirect, JsonResponse, QueryDict, HttpResponse
from django.shortcuts import render, redirect
# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from django.contrib.auth.decorators import login_required

from MIDesignApp.models import *
from MIDesignApp.tools import getuuid, JsonResult, PageHelp, DateEncoder, createmenu, SettingType, TimeStampToTime, \
    recursion_func
from MiDesign import settings
from SysModel.models import Sysuserinfo, Userinfo, Syssetting, Sysmenu, MaterialCredentials, ExperimentInformation, \
    MaterialClassiication, MaterialPerformance, MaterialCharacterization
from time import strftime, localtime, sleep
from django.views.decorators.clickjacking import xframe_options_sameorigin


class UserView(View):
    '''用户列表视图，操作'''
    template_name = "User/_User.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        pindex = request.GET.get('pageindex')
        if pindex:
            """执行分页逻辑"""
            try:
                pindex = int(pindex)
                psize = int(request.GET.get('pagesize'))
                options = request.GET.get('searchParams')
                # 查询对象
                query = Userinfo.objects
                # 排序
                orderfield = request.GET.get('field')
                ordertype = request.GET.get('order')
                orders = ("" if ordertype == "asc" else "-") + (orderfield if orderfield else 'date_joined')
                # 定义搜索条件
                parms = PageHelp.getOptions(options)
                startRow = (pindex - 1) * psize
                endRow = psize * pindex

                # 格式化时间
                query = query.extra(
                    select={"date_joined": "DATE_FORMAT(date_joined, '%%Y-%%m-%%d %%H:%%i:%%s')"})
                query = query.annotate(
                    phone=F('sysuserinfo__phone'), usersex=F('sysuserinfo__usersex'),
                    realname=F('sysuserinfo__username'),
                    depname=F('sysuserinfo__depname')).filter(**parms).values('id', 'username', 'is_active',
                                                                              'date_joined',
                                                                              'first_name',
                                                                              'realname',
                                                                              'usersex',
                                                                              'depname'
                                                                              )
                counts = query.count()
                # 定义分页条件
                queryresult = query.order_by(orders)[startRow:endRow]
                # 获取读取数据总条数

                result = {
                    "status": 0,
                    "msg": '',
                    'count': counts,
                    'data': list(queryresult)
                }
            except Exception as exc:

                result = {
                    "status": -100,
                    "msg": "接口异常:数据查询失败"
                }
            return JsonResponse(result)
        else:
            return render(request, self.template_name, {"suid": getuuid()})

    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        return render(request, self.template_name)

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def delete(self, request):
        result = {'status': 200, 'msg': 'success'}
        DELETE = QueryDict(request.body)
        id = DELETE.get('id')
        deldata = Userinfo.objects.filter(id=id)
        if deldata and deldata.first().username == "admin":
            return JsonResponse({'status': 400, 'msg': '删除失败，admin无法删除'}, safe=False)

        try:
            Sysuserinfo.objects.filter(accountid=id).delete()
            Userinfo.objects.filter(id=id).delete()
        except Exception as exc:
            print("删除失败")
            result['status'] = 400
            result['msg'] = '删除失败'

        return JsonResponse(result, safe=False)


class UserEditView(View):
    """用户编辑"""
    template_name = "User/_UserEdit.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取编辑用户信息'''
        id = int(request.GET.get('id'))
        queryresult = {}
        if id > 0:
            query = Userinfo.objects.extra(
                select={"date_joined": "DATE_FORMAT(date_joined, '%%Y-%%m-%%d %%H:%%i:%%s')"})
            queryresult = query.filter(id=id).annotate(
                phone=F('sysuserinfo__phone'), usersex=F('sysuserinfo__usersex'),
                depname=F('sysuserinfo__depname'),
                realname=F('sysuserinfo__username'),
                uid=F('id'),
                note=F('sysuserinfo__note')).values('uid', 'username', 'is_superuser', 'is_active', 'email',
                                                    'phone',
                                                    'usersex',
                                                    'depname',
                                                    'realname',
                                                    'note'
                                                    ).first()
            return render(request, self.template_name, {'form': json.dumps(queryresult), "suid": getuuid()})
        else:
            return render(request, self.template_name, {'form': json.dumps(queryresult), "suid": getuuid()})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''用户表单提交'''
        self.form = UserFormDto(request.POST)
        errinfo = {
            "status": 200,
            "msg": ''
        }
        if self.form.is_valid():
            extenddata = {};
            data = self.form.cleaned_data  # 校验成功的值，会放在cleaned_data里。
            # data["password"] = make_password(data["password"])
            # 用户扩展信息处理
            extenddata["usersex"] = data.pop("usersex")
            extenddata["note"] = data.pop("note")
            extenddata["phone"] = data.pop("phone")
            extenddata["depname"] = data.pop("depname")
            extenddata["accountid"] = data.pop("uid")
            extenddata["username"] = data.pop("realname")

            # 判断是否是编辑data["id"]
            if extenddata["accountid"] > 0:
                """编辑用户信息"""

                # 判断是否需要修改密码
                if len(data["password"]) == 0:
                    # 没填密码,把密码字段删掉
                    data.pop("password")
                else:
                    # 填写密码,使用django自带方法设置密码
                    password = data.pop("password")
                    user = Userinfo.objects.get(id=extenddata["accountid"])
                    user.set_password(password)
                    user.save()

                # 获取用户模型类
                Userinfo.objects.filter(id=extenddata["accountid"]).update(**data)
                # 修改用户信息
                extendinfo = Sysuserinfo.objects.filter(accountid=extenddata["accountid"])
                if extendinfo:
                    extendinfo.update(**extenddata)
                else:
                    sysuid = Userinfo.objects.get(id=extenddata["accountid"])
                    extenddata["accountid"] = sysuid
                    sysUserInfo = Sysuserinfo(**extenddata)
                    sysUserInfo.save()

            else:
                """此处添加用户信息"""
                if data["is_superuser"]:
                    userinfo = Userinfo.objects.create_superuser(**data)  # 管理员
                else:
                    userinfo = Userinfo.objects.create_user(**data)  # 普通用户

                if userinfo:
                    # sysuid = Userinfo.objects.get(id=userinfo.id)
                    extenddata["accountid"] = userinfo  # accountid以为是关联对象所以传入模型类对象
                    sysUserInfo = Sysuserinfo(**extenddata)
                    sysUserInfo.save()
                else:
                    errinfo["status"] = 400
                    errinfo["msg"] = "操作失败"
        else:
            print(self.form.errors)
            clean_errors = self.form.errors.get("__all__")
            errinfo["status"] = 400
            errinfo["msg"] = '提交失败'
            errinfo["listErr"] = self.form.errors
        return JsonResponse(errinfo, safe=False)


class ParamsSettingView(View):
    '''参数列表视图，操作'''
    template_name = "Sys/_ParamsSetting.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        pindex = request.GET.get('pageindex')
        if pindex:
            """执行分页逻辑"""
            try:
                pindex = int(pindex)
                psize = int(request.GET.get('pagesize'))
                options = request.GET.get('searchParams')
                # 查询对象
                query = Syssetting.objects
                # 排序
                orderfield = request.GET.get('field')
                ordertype = request.GET.get('order')
                orders = ("" if ordertype == "asc" else "-") + (orderfield if orderfield else 'createdate')
                # 定义搜索条件
                parms = PageHelp.getOptions(options)
                startRow = (pindex - 1) * psize
                endRow = psize * pindex

                # 格式化时间
                query = query.extra(
                    select={"createdate": "DATE_FORMAT(createdate, '%%Y-%%m-%%d %%H:%%i:%%s')"})
                # 定义分页条件
                query = query.filter(**parms).values()
                counts = query.count()
                queryresult = query.order_by(orders)[startRow:endRow]
                # 获取读取数据总条数

                result = {
                    "status": 0,
                    "msg": '',
                    'count': counts,
                    'data': list(queryresult)
                }
            except Exception as exc:

                result = {
                    "status": -100,
                    "msg": "接口异常:数据查询失败"
                }
            return JsonResponse(result)
        else:
            pass
        file = os.path.join(os.path.join(settings.BASE_DIR, 'setting'), 'droptype.json')
        # 读取json 下拉项配置信息
        with open(file, 'r') as f:
            dropjson = json.load(f)

        return render(request, self.template_name, {'drop': dropjson, "suid": getuuid()})

    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        return render(request, self.template_name)

    @method_decorator(login_required(login_url='/login'))
    def delete(self, request):
        DELETE = QueryDict(request.body)
        id = DELETE.get('id')
        Syssetting.objects.filter(setid=id).delete()
        return JsonResponse({'status': 200, 'msg': 'success'}, safe=False)


class ParamsSettingEditView(View):
    """下拉类型编辑"""
    template_name = "Sys/_ParamsSettingEdit.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取编辑信息'''

        file = os.path.join(os.path.join(settings.BASE_DIR, 'setting'), 'droptype.json')
        # 读取json 下拉项配置信息
        with open(file, 'r') as f:
            dropjson = json.load(f)

        id = request.GET.get('id')
        if id:
            query = Syssetting.objects
            query = query.extra(select={"createdate": "DATE_FORMAT(createdate,'%%Y-%%m-%%d %%H:%%i:%%s')"})
            queryresult = query.filter(setid=int(id)).values().first()
            return render(request, self.template_name,
                          {'form': json.dumps(queryresult, cls=DateEncoder), 'drop': dropjson,
                           "suid": getuuid()})
        else:
            return render(request, self.template_name, {'drop': dropjson, "suid": getuuid()})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''表单提交'''
        self.form = SysSettingFormDto(request.POST)
        setid = int(request.POST.get("setid"))
        errinfo = {
            "status": 200,
            "msg": ''
        }
        if self.form.is_valid():
            extenddata = {}
            data = self.form.cleaned_data  # 校验成功的值，会放在cleaned_data里。

            # 判断是否是编辑
            if setid > 0:
                """编辑信息"""
                Syssetting.objects.filter(setid=setid).update(**data)

            else:
                """此处添加信息"""
                user = request.user
                data["creator"] = request.user.username
                data["createdate"] = strftime("%Y-%m-%d %H:%M:%S", localtime())
                resultinfo = Syssetting.objects.create(**data)
                if not resultinfo:
                    errinfo["status"] = 400
                    errinfo["msg"] = "操作失败"
        else:
            print(self.form.errors)
            clean_errors = self.form.errors.get("__all__")
            errinfo["status"] = 400
            errinfo["listErr"] = self.form.errors
        return JsonResponse(errinfo, safe=False)


class ParamsSettingTypeEditView(View):
    """下拉选项类型编辑"""
    template_name = "Sys/_SysSettngTypeEdit.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取类型'''
        file = os.path.join(os.path.join(settings.BASE_DIR, 'setting'), 'droptype.json')
        try:
            with open(file, 'r') as f:
                result = json.load(f)

            return render(request, self.template_name, {'form': result, "suid": getuuid()})

        except Exception as e:
            pass

        return render(request, self.template_name, {'form': "[]", "suid": getuuid()})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''表单提交'''
        typestr = request.POST.get("typestr")
        type = request.POST.get("type")
        typename = request.POST.get("typename")
        errinfo = {
            "status": 200,
            "msg": ''
        }

        # 如果是del 则要检测系统下拉选项是否存在数据，否则无法删除
        if type == 'del' and Syssetting.objects.filter(settype=typename):
            errinfo = {
                "status": 400,
                "msg": '参数设置表已经存在该分类数据，无法删除'
            }
            return JsonResponse(errinfo, safe=False)

        if len(typestr) > 0:
            file = os.path.join(os.path.join(settings.BASE_DIR, 'setting'), 'droptype.json')
            try:
                with open(file, 'w') as f:
                    f.write(typestr)
                return JsonResponse(errinfo, safe=False)

            except Exception as e:
                pass

            else:
                errinfo["status"] = 400
                errinfo["msg"] = '提交失败'
                errinfo["typename"] = "填写信息不能为空"

        return JsonResponse(errinfo, safe=False)


class SettingView(View):
    """系统设置编辑"""
    template_name = "Sys/_Sys.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取类型'''
        file = os.path.join(os.path.join(settings.BASE_DIR, 'setting'), 'sys.json')
        try:
            with open(file, 'r') as f:
                result = json.load(f)

            return render(request, self.template_name, {'form': result, "suid": getuuid()})

        except Exception as e:
            pass

        return render(request, self.template_name, {'form': "[]", "suid": getuuid()})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''表单提交'''
        company = request.POST.get("company")
        errinfo = {
            "status": 200,
            "msg": ''
        }
        if len(company) > 0:
            file = os.path.join(os.path.join(settings.BASE_DIR, 'setting'), 'sys.json')
            try:
                with open(file, 'w') as f:
                    f.write(company)
                return JsonResponse(errinfo, safe=False)

            except Exception as e:
                pass

            else:
                errinfo["status"] = 400
                errinfo["msg"] = '提交失败'
                errinfo["typename"] = "填写信息不能为空"

        return JsonResponse(errinfo, safe=False)


class MenuModuleView(View):
    """系统菜单"""
    template_name = "Sys/_MenuModule.html"

    @method_decorator(login_required(login_url='/login'))
    def delete(self, request):
        DELETE = QueryDict(request.body)
        id = DELETE.get('id')
        if Sysmenu.objects.filter(menuparentid=id):
            errinfo = {}
            errinfo["status"] = 400
            errinfo["msg"] = '该节点下存在子节点菜单，无法直接删除'
            return JsonResponse(errinfo, safe=False)

        Sysmenu.objects.filter(menuid=id).delete()
        return JsonResponse({'status': 200, 'msg': 'success'}, safe=False)

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取菜单模块信息'''
        # 查询对象
        query = Sysmenu.objects
        # 排序
        ordertype = request.GET.get('order')
        orders = 'orderfield'
        # 定义搜索条件
        query = query.extra(select={"createdate": "DATE_FORMAT(createdate,'%%Y-%%m-%%d %%H:%%i:%%s')"})
        queryresult = query.annotate(
            id=F('menuid'), title=F('menuname'),
            pid=F('menuparentid')).values('id', 'title', 'pid', 'creator', 'isadmin', 'menustatus', 'orderfield',
                                          'createdate').order_by(orders)

        return render(request, self.template_name, {"suid": getuuid(), 'jsondata': list(queryresult)})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''修改状态'''
        id = int(request.POST.get("id"))
        status = int(request.POST.get("status"))
        type = request.POST.get("type")
        errinfo = {
            "status": 200,
            "msg": ''
        }
        if id == 0 or len(type) == 0:
            raise ValueError("参数无效")

        if type == 'isadmin':
            Sysmenu.objects.filter(menuid=id).update(isadmin=status)
        else:
            Sysmenu.objects.filter(menuid=id).update(menustatus=status)

        return JsonResponse(errinfo, safe=False)


class MenuModuleEditView(View):
    """系统菜单"""
    template_name = "Sys/_MenuModuleEdit.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取菜单模块信息'''
        # 查询对象
        query = Sysmenu.objects
        # 排序
        id = int(request.GET.get('id'))
        queryresult = {}
        # 定义搜索条件
        if id > 0:
            query = query.extra(select={"createdate": "DATE_FORMAT(createdate,'%%Y-%%m-%%d %%H:%%i:%%s')"})
            queryresult = query.filter(menuid=id).values().first()
            return render(request, self.template_name,
                          {"suid": getuuid(), 'form': json.dumps(queryresult, cls=DateEncoder)})
        else:
            pid = int(request.GET.get('pid'))
            queryresult["menuparentid"] = pid

        return render(request, self.template_name,
                      {"suid": getuuid(), 'form': json.dumps(queryresult, cls=DateEncoder)})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''表单提交'''
        self.form = SysMenuModuleFormDto(request.POST)
        setid = int(request.POST.get("menuid"))
        errinfo = {
            "status": 200,
            "msg": ''
        }
        if self.form.is_valid():
            # 检测数据是否合法
            data = self.form.cleaned_data  # 校验成功的值，会放在cleaned_data里。
            if setid == 0 and Sysmenu.objects.filter(menuname=data["menuname"]):
                errinfo = {
                    "status": 400,
                    "msg": '菜单名称已经存在，无法重复添加'
                }
                return JsonResponse(errinfo, safe=False)
            elif setid > 0 and Sysmenu.objects.filter(Q(menuname=data["menuname"]) & ~Q(menuid=setid)):
                errinfo = {
                    "status": 400,
                    "msg": '菜单名称已经存在，无法重复添加'
                }
                return JsonResponse(errinfo, safe=False)

            # 判断是否是编辑
            if setid > 0:
                """编辑信息"""
                Sysmenu.objects.filter(menuid=setid).update(**data)
            else:
                """此处添加信息"""
                user = request.user
                data["creator"] = request.user.username
                resultinfo = Sysmenu.objects.create(**data)
                if not resultinfo:
                    errinfo["status"] = 400
                    errinfo["msg"] = "操作失败"

        else:
            print(self.form.errors)
            clean_errors = self.form.errors.get("__all__")
            errinfo["status"] = 400
            errinfo["listErr"] = self.form.errors

        return JsonResponse(errinfo)


class MenuView(View):
    """系统菜单"""

    def get(self, request, *args, **kwargs):
        '''读取菜单模块信息'''
        # 查询对象
        query = Sysmenu.objects
        # 排序
        orders = 'orderfield'
        # 定义搜索条件
        query = query.extra(select={"createdate": "DATE_FORMAT(createdate,'%%Y-%%m-%%d %%H:%%i:%%s')"})
        queryresult = query.filter(menustatus=1).annotate(
            id=F('menuid'), title=F('menuname'),
            pid=F('menuparentid'), href=F('menuurl')).values('id', 'title', 'pid', 'icon', 'href').order_by(orders)

        root = queryresult.filter(Q(pid=0) & Q(isadmin=1))

        foreroot = queryresult.filter(Q(pid=0) & Q(isadmin=0))

        menuInfo = []
        foremenuInfo = []
        for item in root:
            #
            if queryresult.filter(pid=item["id"]):
                menuInfo.append({
                    "title": item["title"],
                    "icon": "fa " + item["icon"],
                    "href": "" if item["href"] == "#" else item["href"],
                    "target": "_self",
                    "child": createmenu(queryresult, item["id"])
                })
            else:
                menuInfo.append({
                    "title": item["title"],
                    "icon": "fa " + item["icon"],
                    "href": "" if item["href"] == "#" else item["href"],
                    "target": "_self"
                })

        for item in foreroot:
            if queryresult.filter(pid=item["id"]):
                foremenuInfo.append({
                    "title": item["title"],
                    "icon": "fa " + item["icon"],
                    "href": "" if item["href"] == "#" else item["href"],
                    "target": "_blank",
                    "child": createmenu(queryresult, item["id"])
                })
            else:
                foremenuInfo.append({
                    "title": item["title"],
                    "icon": "fa " + item["icon"],
                    "href": "" if item["href"] == "#" else item["href"],
                    "target": "_blank"
                })
        sysmenu = {
            "homeInfo": {"title": "材料信息管理", "href": "/admin"},
            "logoInfo": {"title": "材料数据库平台", "image": "../static/images/logo2.png", "href": ""},
            "menuInfo": menuInfo,
            "premenuInfo": foremenuInfo
        }
        print(sysmenu)
        # 普通用户不展示系统设置
        if not request.user.is_superuser:
            del sysmenu['menuInfo'][-1]
        return JsonResponse(sysmenu, safe=False)


# 上传文件
class UploadView(View):

    @xframe_options_sameorigin
    @method_decorator(login_required(login_url='/login'))
    def post(self, request):

        file = request.FILES['file']
        request.GET.get('dir')
        if file:

            # 判断保存文件的子路径有没有
            ret = os.path.exists(settings.MEDIA_ROOT + '/files')
            if not ret:
                os.mkdir(settings.MEDIA_ROOT + '/files')

            # 创建时间戳 以时间戳命名
            millis = int(round(time.time() * 1000))

            fnamelis = file.name.split('.')

            path = settings.MEDIA_ROOT + '/files/' + str(millis) + '.' + fnamelis[-1]

            with open(path, 'wb') as f:
                for re in file.readlines():
                    f.write(re)
                url = 'media/files/' + str(millis) + '.' + fnamelis[-1]

            if request.GET.get('dir'):
                return JsonResponse({'error': 0,
                                     'url': url,
                                     'filename': file.name})
            else:
                return JsonResponse({"code": 0,
                                     "msg": "ok",
                                     "data": {
                                         'filename': file.name,
                                         "src": url
                                     }})

        # else:
        #     image = request.FILES['imgFile']
        #
        #     # 判断保存图片的子路径有没有
        #     ret = os.path.exists(settings.MEDIA_ROOT + '/record')
        #     if not ret:
        #         os.mkdir(settings.MEDIA_ROOT + '/record')
        #
        #     # 创建时间戳 以时间戳命名
        #     millis = int(round(time.time() * 1000))
        #
        #     path = settings.MEDIA_ROOT + '/record/' + str(millis) + '.jpg'
        #
        #     with open(path, 'wb') as f:
        #         for chunk in image.chunks():
        #             f.write(chunk)
        #         url = 'media/record/' + str(millis) + '.jpg'
        #
        #     # //富文本文件上传成功时
        #     # {
        #     #         "error" : 0,
        #     #         "url" : "http://www.example.com/path/to/file.ext"
        #
        #     # }
        #     # //失败时
        #     # {
        #     #         "error" : 1,
        #     #         "message" : "错误信息"
        #     # }
        #     return JsonResponse({'error': 0,
        #                          'url': url})


# todo 实验
# class ExperimentView(View):
#     '''列表视图，操作'''
#     template_name = "experiment/_experiment.html"
#
#     @method_decorator(login_required(login_url='/login'))
#     def get(self, request, *args, **kwargs):
#         page = request.GET.get('pageindex')
#
#         if page:
#             try:
#                 pindex = int(page)
#                 psize = int(request.GET.get('pagesize'))
#                 # 获取查询条件
#                 options = request.GET.get('searchParams')
#
#                 # 排序
#                 orderfield = request.GET.get('field')
#                 ordertype = request.GET.get('order')
#                 orders = ("" if ordertype == "asc" else "-") + (orderfield if orderfield else 'createdate')
#
#                 # 定义分页
#                 startRow = (pindex - 1) * psize
#                 endRow = psize * pindex
#
#                 # 添加查询条件
#                 parms = PageHelp.getOptions(options)
#                 parset = {'materiacatalogid__icontains', 'mname__icontains', 'kindcatalogid__icontains'}
#                 parmsexr = {}
#                 seteid = set()
#                 for key in parms.keys()&parset:
#                     parmsexr[key] = parms[key]
#                     del parms[key]
#
#                 if parmsexr:
#                     exr = Exrecord.objects.filter(**parmsexr)
#                     for i in exr:
#                         seteid.add(i.eid)
#                     exp = Experimentnfo.objects.filter(id__in=seteid).filter(**parms).values().order_by(orders)
#
#                 else:
#
#                     # 获取查询集
#                     exp = Experimentnfo.objects.filter(**parms).values().order_by(orders)
#                 count = exp.count()
#                 exp.extra(
#                     select={"createdate": "DATE_FORMAT(createdate, '%%Y-%%m-%%d %%H:%%i:%%s')"})
#
#                 exps = exp[startRow:endRow]
#             except Exception as e:
#                 result = {
#                     "status": -100,
#                     "msg": "接口异常:数据查询失败"
#                 }
#                 return JsonResponse(result)
#
#             return JsonResponse({'status': 0,
#                                  'msg': '',
#                                  'count': count,
#                                  'data': list(exps)})
#         else:
#             if request.user.is_superuser:
#                 # 超管
#                 self.template_name = 'experiment/_experiment.html'
#             else:
#                 # 普通人员
#                 self.template_name = 'experiment/_experiment02.html'
#             return render(request, self.template_name, {"suid": getuuid()})
#
#     @transaction.atomic
#     @method_decorator(login_required(login_url='/login'))
#     def delete(self, request):
#
#         result = {'status': 200, 'msg': 'success'}
#
#         DELETE = QueryDict(request.body)
#         id = DELETE.get('id')
#
#         try:
#             Exrecord.objects.filter(eid=id).delete()
#             Experimentnfo.objects.get(id=id).delete()
#
#         except Exception as e:
#
#             result['status'] = 400
#             result['msg'] = '删除失败'
#             return JsonResponse(result, safe=False)
#
#         return JsonResponse(result, safe=False)

#
# # todo 添加编辑实验
# class ExperimentViewEdit(View):
#     """编辑"""
#
#     @method_decorator(login_required(login_url='/login'))
#     def get(self, request, *args, **kwargs):
#         event = request.GET.get('event')
#         id = request.GET.get('id')
#         if event == 'add':
#             # todo 添加实验页面
#             return render(request, 'experiment/_experimentEdit.html', {'suid': getuuid()})
#         elif event == 'edit':
#             # todo 编辑实验页面
#             exp = Experimentnfo.objects.filter(id=id).values().first()
#             dic = dict(exp)
#             dic['id'] = id
#             dic['suid'] = getuuid()
#             return render(request, 'experiment/_experimentEdit.html', dic)
#
#     @transaction.atomic
#     @method_decorator(login_required(login_url='/login'))
#     def post(self, request):
#
#         data = dict(request.POST)
#         print(data)
#         for i in request.POST:
#             data[i] = request.POST[i]
#
#         errinfo = {
#             "status": 200,
#             "msg": ''
#         }
#         if not all(data['experimentname']):
#             errinfo['status'] = 400
#             errinfo['msg'] = '缺少必传参数'
#             return JsonResponse(errinfo)
#
#         if data.get('exp_id'):
#             # todo 更新实验
#
#             data['createtor'] = request.user.username
#             data['userid'] = request.user.id
#             id = data.pop('exp_id')
#             Experimentnfo.objects.filter(id=id).update(**data)
#
#             return JsonResponse(errinfo)
#
#         # todo 添加实验
#         try:
#             del data['exp_id']
#             data['createtor'] = request.user.username
#             data['userid'] = request.user.id
#             Experimentnfo.objects.create(**data)
#         except Exception as e:
#             return JsonResponse(errinfo)
#         return JsonResponse(errinfo)
#
#
# # todo 实验详情
# class ExrecordView(View):
#     template_name = "experiment/_exrecord.html"
#
#     @method_decorator(login_required(login_url='/login'))
#     def get(self, request):
#
#         page = request.GET.get('pageindex')
#
#         if page:
#             try:
#                 id = request.GET.get('id')
#                 pindex = int(page)
#                 psize = int(request.GET.get('pagesize'))
#                 # 获取查询条件
#                 options = request.GET.get('searchParams')
#
#                 # 排序
#                 orderfield = request.GET.get('field')
#                 ordertype = request.GET.get('order')
#                 orders = ("" if ordertype == "asc" else "-") + (orderfield if orderfield else 'id')
#
#                 # 定义分页
#                 startRow = (pindex - 1) * psize
#                 endRow = psize * pindex
#
#                 # 添加查询条件
#                 parms = PageHelp.getOptions(options)
#
#                 # 获取查询集
#                 exp = Exrecord.objects.filter(eid=id).filter(**parms).values().order_by(orders)
#                 count = exp.count()
#                 # exp.extra(
#                 #     select={"createdate": "DATE_FORMAT(createdate, '%%Y-%%m-%%d %%H:%%i:%%s')"})
#
#                 exps = exp[startRow:endRow]
#             except Exception as e:
#                 result = {
#                     "status": -100,
#                     "msg": "接口异常:数据查询失败"
#                 }
#                 return JsonResponse(result)
#
#             return JsonResponse({'status': 0,
#                                  'msg': '',
#                                  'count': count,
#                                  'data': list(exps)})
#         else:
#             # todo 实验详情表格页面
#             id = request.GET.get('id')
#             parameter = request.GET.get('searchParams') if request.GET.get('searchParams') else {}
#             # 查看实验详情列表
#             # 编辑材料
#             syssetting = list(Syssetting.objects.filter(settype='材料种类').values('setvalue'))
#             list_type = []
#             for i in syssetting:
#                 list_type.append(i['setvalue'])
#
#             administrator = 0
#             if request.user.is_superuser:
#                 # 超级管理员
#                 administrator = 1
#             return render(request, self.template_name,
#                           {'id': id, "suid": getuuid(), 'settype': list_type, 'admins': administrator,
#                            'parameter': parameter})
#
#     @xframe_options_sameorigin
#     @method_decorator(login_required(login_url='/login'))
#     def post(self, request):
#
#         if request.GET.get('dir') == 'file':
#             file = request.FILES['imgFile']
#
#             # 判断保存文件的子路径有没有
#             ret = os.path.exists(settings.MEDIA_ROOT + '/document')
#             if not ret:
#                 os.mkdir(settings.MEDIA_ROOT + '/document')
#
#             # 创建时间戳 以时间戳命名
#             millis = int(round(time.time() * 1000))
#
#             fnamelis = file.name.split('.')
#
#             path = settings.MEDIA_ROOT + '/document/' + str(millis) + '.' + fnamelis[-1]
#
#             with open(path, 'wb') as f:
#                 for re in file.readlines():
#                     f.write(re)
#                 url = 'media/document/' + str(millis) + '.' + fnamelis[-1]
#
#             return JsonResponse({'error': 0,
#                                  'url': url,
#                                  'filename': file.name})
#
#         else:
#             image = request.FILES['imgFile']
#
#             # 判断保存图片的子路径有没有
#             ret = os.path.exists(settings.MEDIA_ROOT + '/record')
#             if not ret:
#                 os.mkdir(settings.MEDIA_ROOT + '/record')
#
#             # 创建时间戳 以时间戳命名
#             millis = int(round(time.time() * 1000))
#
#             path = settings.MEDIA_ROOT + '/record/' + str(millis) + '.jpg'
#
#             with open(path, 'wb') as f:
#                 for chunk in image.chunks():
#                     f.write(chunk)
#                 url = 'media/record/' + str(millis) + '.jpg'
#
#             # //成功时
#             # {
#             #         "error" : 0,
#             #         "url" : "http://www.example.com/path/to/file.ext"
#
#             # }
#             # //失败时
#             # {
#             #         "error" : 1,
#             #         "message" : "错误信息"
#             # }
#             return JsonResponse({'error': 0,
#                                  'url': url})
#
#     @transaction.atomic
#     @method_decorator(login_required(login_url='/login'))
#     def delete(self, request):
#         result = {'status': 200, 'msg': 'success'}
#
#         DELETE = QueryDict(request.body)
#         id = DELETE.get('id')
#
#         try:
#             Exrecord.objects.filter(id=id).delete()
#
#         except Exception as e:
#
#             result['status'] = 400
#             result['msg'] = '删除失败'
#             return JsonResponse(result, safe=False)
#
#         return JsonResponse(result, safe=False)
#
#
# # todo 添加编辑详情
# class ExrecordEditView(View):
#     template_name = "experiment/_exrecord.html"
#
#     @method_decorator(login_required(login_url='/login'))
#     def get(self, request):
#         id = int(request.GET.get('id'))
#         print(id)
#         # 获取分类
#         syssetting = list(Syssetting.objects.filter(settype='材料种类', usestate=1).values('setvalue'))
#         list_type = []
#         for i in syssetting:
#             list_type.append(i['setvalue'])
#
#         # 科学计数类别
#         science = list(Syssetting.objects.filter(settype='科学计数类别', usestate=1).values('setvalue'))
#         list_science = []
#         for i in science:
#             list_science.append(i['setvalue'])
#
#         # 单位:
#         units = list(Syssetting.objects.filter(settype='单位', usestate=1).values('setvalue'))
#         list_unit = []
#         for i in units:
#             print(i['setvalue'])
#             list_unit.append(i['setvalue'])
#
#         # 富文本基本字段
#         welfaretext = list(Syssetting.objects.filter(settype='富文本', usestate=1).values('setname', 'setvalue'))
#
#         event = request.GET.get('event')
#         if event == 'add':
#             # todo 添加详情
#
#             return render(request, 'experiment/_exrecordEdit.html',
#                           {'id': id, 'settype': list_type, 'science': list_science, 'condition': 0, 'suid': getuuid(),
#                            'units': list_unit, 'weltext': welfaretext})
#         elif event == 'edit':
#             # todo 编辑详情
#             exr = Exrecord.objects.filter(id=id).values().first()
#             # value = exr.valueinfo
#             valuelis = exr['valueinfo'].split('×')[1:]
#             exr['preparationprocess'] = json.loads(exr['preparationprocess'])
#
#             textid = [k for i in exr['preparationprocess'] for k, v in i.items() if k != 'name']
#
#             return render(request, 'experiment/_exrecordEdit.html',
#                           {'id': id, 'settype': list_type, 'science': list_science, 'condition': 1, 'model': exr,
#                            'suid': getuuid(), 'units': list_unit, 'valuelist': valuelis, 'textid': textid,
#                            'weltext': welfaretext})
#         elif event == 'check':
#             # todo 查看详情
#             exr = Exrecord.objects.filter(id=id).values().first()
#             valuelis = exr['valueinfo'].split('×')[1:]
#             exr = dict(exr)
#             exr['experimentname'] = Experimentnfo.objects.get(id=exr['eid']).experimentname
#             exr['valuelist'] = valuelis
#             exr['preparationprocess'] = json.loads(exr['preparationprocess'])
#             textid = [k for i in exr['preparationprocess'] for k, v in i.items() if k != 'name']
#             return render(request, 'experiment/check_exr.html', exr)
#
#     @transaction.atomic
#     @method_decorator(login_required(login_url='/login'))
#     def post(self, request):
#
#         errinfo = {
#             "status": 200,
#             "msg": ''
#         }
#
#         data = dict(request.POST)
#         print(data)
#         for i in request.POST:
#             data[i] = request.POST[i]
#
#         if not all(data['mname']):
#             errinfo['status'] = 400
#             errinfo['msg'] = '缺少必传参数'
#             return JsonResponse(errinfo)
#
#         if len(data['mname']) > 255 or len(data['kindcatalogid']) > 255 or len(data['materiacatalogid']) > 255 or \
#                 len(data['unit']) > 255 or len(data['valueunit']) > 255 or len(data['valueinfo']) > 255:
#             errinfo['status'] = 400
#             errinfo['msg'] = '参数过长'
#             return JsonResponse(errinfo)
#
#         welfaretext = list(Syssetting.objects.filter(settype='富文本', usestate=1).values('setname', 'setvalue'))
#         newlist = [x['setname'] for x in welfaretext]
#         t = '''<html>
#          <head>
#           <title>
#            The Dormouse's story
#           </title>
#          </head>
#          <body>
#          <h1 onclick="this.innerHTML = 'Hello!'">点击此文本！</h1>
#          <h1 oncliad="this.innerHTML = 'Hello!'">点击此文本！</h1>
#          <h1 style="this.innerHTML = 'Hello!'">点击此文本！</h1>
#           <p class="title" name="dromouse">
#            <b>
#             The Dormouse's story
#            </b>
#           </p>
#           <p class="story">
#            Once upon a time there were three little sisters; and their names were
#            <a class="sister" href="http://example.com/elsie" id="link1">
#             <!-- Elsie -->
#            </a>
#            ,
#            <a class="sister" href="http://example.com/lacie" id="link2">
#             Lacie
#            </a>
#            and
#            <a class="sister" href="http://example.com/tillie" id="link3">
#             Tillie
#            </a>
#            ;
#         and they lived at the bottom of a well.
#           </p>
#           <p class="story">
#            ...
#           </p>
#          </body>
#          <script> alert("欢迎来到JavaScript世界！！！");</script>
#         </html>'''
#         # 构造Cleaner的对象
#         cleaner = Cleaner(
#             scripts=True,
#             javascript=True,
#             links=False,
#             safe_attrs_only=False,
#             meta=False
#         )
#         dictext = []
#         for k in data:
#
#             # 过滤js脚本以及写在标签上的js
#             try:
#                 cleaned_html = cleaner.clean_html(data[k])
#                 data[k] = cleaned_html
#             except Exception as e:
#                 print(e)
#                 continue
#
#             # 判断该k是否是富文本
#             if k in newlist:
#                 # 循环富文本字典字段列表
#                 for i in welfaretext:
#                     # 判断k是否在某个字典中
#                     if k in i.values():
#                         dictext.append({
#                             k: data[k],
#                             'name': i['setvalue']
#                         })
#                 # 跳过循环不执行下面的过滤html标签
#                 continue
#             # 过滤html标签
#             desc = strip_tags(data[k])
#             data[k] = desc
#
#         for i in newlist:
#             if i in data:
#                 del data[i]
#
#         print(data)
#         data['createtor'] = request.user.username
#         data['userid'] = request.user.id
#
#         data['preparationprocess'] = json.dumps(dictext)
#         condition = data.pop('condition')
#         # id大于0是编辑,等于零是添加
#         if int(condition) > 0:
#             Exrecord.objects.filter(id=int(data['id'])).update(**data)
#             errinfo['msg'] = '修改成功'
#             errinfo['tab'] = 'editexr'
#         else:
#             data['eid'] = data.pop('id')
#             Exrecord.objects.create(**data)
#             errinfo['msg'] = '添加成功'
#             errinfo['tab'] = 'addexr'
#
#         return JsonResponse(errinfo)
#
#
class CeShiView(View):
    template_name = "test.html"

    def get(self, request):
        return render(request, self.template_name, {"suid": getuuid()})

# class ReplicationView(View):
#
#     def get(self, request):
#
#         errinfo = {
#             "status": 200,
#             "msg": ''
#         }
#         id = request.GET.get('id')
#         try:
#             exr = Exrecord.objects.filter(id=id).values().first()
#
#             del exr['id']
#             Exrecord.objects.create(**exr)
#         except Exception as e:
#             errinfo["status"] = 400
#             errinfo['msg'] = '接口异常'
#
#         return JsonResponse(errinfo)
