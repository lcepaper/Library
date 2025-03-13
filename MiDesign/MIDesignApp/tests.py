from django.db import transaction
from django.http import HttpResponseRedirect
from django.shortcuts import render, redirect


from MIDesignApp.models import RegisterDto
from SysModel.models import Userinfo

# 添加回滚机制
# @transaction.atomic
def createUser(request):
    """测试 添加超级管理员"""
    if request.method == 'GET':
        form = RegisterDto(initial={"username": ""})
        return render(request, "config.html", {"form": form})

    else:
        form = RegisterDto(request.POST)
        if form.is_valid():  # 进行数据校验
            data = form.cleaned_data  # 校验成功的值，会放在cleaned_data里。
            # 添加普通用户注册
            userinfo = Userinfo.objects.create_user(**data)
            if not userinfo:
                return redirect('/test')
            else:
                return redirect('/login')

        else:
            clean_errors = form.errors.get("__all__")
            print(form.errors)
    return render(request, "config.html", {"form": form, "clean_errors": clean_errors})


