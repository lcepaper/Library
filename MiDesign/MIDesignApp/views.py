# 认证模块
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from django.shortcuts import render, redirect
# Create your views here.
from django.utils.decorators import method_decorator
from django.views import View
from django.views.generic import TemplateView

from MIDesignApp.models import LoginDto, RegisterDto
# User.objects.create_user(**data)  创建用户
from MIDesignApp.tools import getuuid, judgment_func
from SysModel.models import Userinfo, MaterialClassiication


# 对应数据库


def ajaxlogin(request):
    """ajax登录系统"""
    result = {"status": 200}

    if request.method == "GET":
        return render(request, 'ajaxlogin.html')
    else:
        form = LoginDto(request.POST)
        if form.is_valid():  # 进行数据校验
            # 校验成功
            data = form.cleaned_data  # 校验成功的值，会放在cleaned_data里。
            userinfo = auth.authenticate(**data)
            if not userinfo:
                result["msg"] = '用户名或密码不正确'
                result["status"] = 500
            else:
                auth.login(request, userinfo)
        else:
            print(form.errors)
            result["errs"] = form.errors
            result["status"] = 500

        return JsonResponse(result)


def login(request):
    """登录页面"""
    clean_errors = {}
    loginmodule = "login.html"
    if request.user.is_authenticated:
        path = request.GET.get("next") or "/admin"  # todo next是重定向的路径,是登录用户重定向到next参数页面,没有参数直接跳转index
        print(path)
        return redirect(path)
    if request.method == "GET":
        form = LoginDto(initial={"username": ""})
        return render(request, loginmodule, {"form": form, "clean_errors": clean_errors})  # 返回登录页面
    else:
        form = LoginDto(request.POST)
        if form.is_valid():  # 进行数据校验
            # 校验成功
            data = form.cleaned_data  # 校验成功的值，会放在cleaned_data里。
            userinfo = auth.authenticate(**data)
            if userinfo:
                auth.login(request, userinfo)
                path = request.GET.get("next") or "/admin"  # todo 登录校验成功跳转next参数页面or直接跳转index页面
                print(path)
                return redirect(path)
            else:
                # raise ValidationError('不存在此用户')
                clean_errors = {"username": "不存在此用户或密码不正确"};
        else:
            print(form.errors)
            clean_errors = form.errors.get("__all__")
    return render(request, loginmodule, {"form": form, "clean_errors": clean_errors})


def loginout(request):
    """退出系统"""
    auth.logout(request)
    print("111111")
    return redirect("/login")


#
# def register(request):
#     if request.method == "GET":
#         form = UserinfoDto()
#         return render(request, "login.html", {"form": form})
#     else:
#         form = UserinfoDto(request.POST)
#         if form.is_valid():  # 进行数据校验
#             # 校验成功
#             data = form.cleaned_data  # 校验成功的值，会放在cleaned_data里。
#             data["creator"] = 'admin'
#             data['usestate'] = 1
#             # data.pop('r_salary')
#
#             print(data)
#             Userinfo.objects.create(**data)
#             # return HttpResponse(
#             #     'ok'
#             # )
#             return render(request, "login.html", {"form": form})
#         else:
#             print(form.errors)  # 打印错误信息
#             clean_errors = form.errors.get("__all__")
#             print(222, clean_errors)
#
#         return render(request, "login.html", {"form": form, "clean_errors": clean_errors})
#


class AdminView(TemplateView):
    template_name = "Sys/admin.html"

    # def dispatch(self, request, *args, **kwargs):
    #     # 使用dispatch方法来做一些动态处理
    #     if request.user.is_superuser:
    #         # 超管
    #         self.template_name = 'Sys/admin.html'
    #     else:
    #         # 普通人员
    #         self.template_name = 'Sys/admin02.html'
    #     func = getattr(self, request.method.lower())
    #     ret = func(request, *args, **kwargs)
    #     return ret

    def get_context_data(self, **kwargs):
        context = {'suid': getuuid()}
        if self.request.user.is_superuser:
            # 超级管理
            context['admin'] = 1
        else:
            context['admin'] = 0
        return context


# 用户注册
class UserRegisterView(View):
    form = RegisterDto(initial={"username": ""});
    template_name = 'register.html'

    def get(self, request, *args, **kwargs):

        return render(request, self.template_name, {'form': self.form})

    def post(self, request, *args, **kwargs):
        self.form = RegisterDto(request.POST)
        if self.form.is_valid():
            data = self.form.cleaned_data  # 校验成功的值，会放在cleaned_data里。

            existuser = Userinfo.objects.filter(username=data["username"])
            if len(existuser) > 0:
                return render(request, self.template_name, {'form': self.form, "clean_errors": ['用户名已存在']})
                # self.form.username.errors[0] = "用户名已存在!"
                # raise ValidationError("用户名已存在！")

            # 添加普通用户注册
            userinfo = Userinfo.objects.create_user(**data)
            if not userinfo:
                return redirect('/register')
            else:
                return redirect('/login')
        else:
            print(self.form.errors)
            clean_errors = self.form.errors.get("__all__")

        return render(request, self.template_name, {'form': self.form, "clean_errors": clean_errors})


class UppwdView(View):
    """修改密码"""
    template_name = 'uppwd.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {"suid": getuuid()})

    def post(self, request, *args, **kwargs):
        user = request.user
        status = {"status": 200, "msg": ""}
        pwd = request.POST.get("password")
        oldpwd = request.POST.get("oldpwd")

        if len(pwd) == 0 or len(oldpwd) == 0:
            status["status"] = 400
            status["msg"] = "参数丢失"
            return JsonResponse(status)

        if pwd == oldpwd:
            status["status"] = 400
            status["msg"] = "原始密码和新密码不能相同"
            return JsonResponse(status)

        userinfo = Userinfo.objects.get(id=user.id)
        if not userinfo:
            status["status"] = 400
            status["msg"] = "修改失败"
            return JsonResponse(status)
        else:
            if not check_password(oldpwd, user.password):
                status["status"] = 400
                status["msg"] = "原始密码输入不正确"
                return JsonResponse(status)

        userinfo.password = make_password(pwd)
        userinfo.save()
        return JsonResponse(status)


def page_not_found(request, exception):
    return render(request, '404.html', {})


def page_not_error(request, exception):
    return render(request, '500.html', {})


def get_status(request):
    job_id = request.GET.get("id")
    return JsonResponse({
        "task status": app.AsyncResult(job_id).state,
        "task result": app.AsyncResult(job_id).result
    })


def limit(request):
    """权限页面"""
    if request.method == "GET":
        return render(request, '500.html', {})







# def AcquireRecord(request):
#     if request.method == 'GET':
#         id = int(request.GET.get('id'))
#         exr = Exrecord.objects.filter(eid=id).values('mname', 'mno', 'kindcatalogid', 'materiacatalogid', 'unit',
#                                                      'valueunit', 'valueinfo', 'id')
#         return JsonResponse({"code": 200,
#                              'msg': '获取成功',
#                              'data': list(exr)})
