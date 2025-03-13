from django.core.exceptions import ValidationError
# Create your models here.
from django import forms

from SysModel.models import Userinfo

"""用户登录验证"""


class LoginDto(forms.Form):
    username = forms.CharField(min_length=5, empty_value='', label="账户",
                               error_messages={"min_length": "填写字符至少5个", "required": "账户不能为空!"})
    password = forms.CharField(label="密码", error_messages={"required": "密码不能为空!"})


class RegisterDto(forms.Form):
    """用户注册实体：单独便于以后扩展"""
    username = forms.CharField(min_length=5, empty_value='', label="账户",
                               error_messages={"min_length": "填写字符至少5个", "required": "账户不能为空!"})
    password = forms.CharField(label="密码", error_messages={"required": "密码不能为空!"})




class UserFormDto(forms.Form):
    """用户注册实体：单独便于以后扩展"""
    username = forms.CharField(min_length=5, empty_value='', label="账户",
                               error_messages={"min_length": "填写字符至少5个", "required": "账户不能为空!"})
    password = forms.CharField(label="密码", required=False)

    is_superuser = forms.BooleanField(required=False)

    is_active = forms.BooleanField(required=False)

    email = forms.EmailField(required=False)

    note = forms.CharField(required=False)

    usersex = forms.CharField(required=False)

    realname = forms.CharField(required=False)

    phone = forms.CharField(max_length=12, required=False)

    depname = forms.CharField(max_length=22, required=False)

    uid = forms.IntegerField(required=False)

    # def clean_username(self):  # 局部钩子
    #    username_val = self.cleaned_data.get("username")
    #     if val.isdigit():
    #         raise ValidationError("用户名不能是纯数字")
    #     elif id_val == 0 and Userinfo.objects.filter(username=val):
    #         raise ValidationError("用户名已存在！")
    #     else:
    #         return val

    def clean(self):  # 全局钩子
        id_val = self.cleaned_data.get("uid")
        password_val = self.cleaned_data.get("password")
        username_val = self.cleaned_data.get("username")
        if id_val == 0:
            if len(password_val) == 0:
                raise ValidationError("密码不能为空")

            if username_val.isdigit():
                raise ValidationError("用户名不能是纯数字")
            elif id_val == 0 and Userinfo.objects.filter(username=username_val):
                raise ValidationError("用户名已存在！")

        else:
            if Userinfo.objects.filter(username=username_val and id != id_val):
                raise ValidationError("用户名已存在！")

            return self.cleaned_data


class SysSettingFormDto(forms.Form):
    """参数表设置"""
    setvalue = forms.CharField(max_length=32, required=False)

    setname = forms.CharField(max_length=32, error_messages={"required": "不能为空!"})

    settype = forms.CharField(max_length=32, error_messages={"required": "不能为空!"})

    color = forms.CharField(max_length=32, required=False)

    usestate = forms.IntegerField(required=True)


class SysMenuModuleFormDto(forms.Form):
    """菜单模块设置"""
    menuname = forms.CharField(error_messages={"required": "不能为空!"})

    menuurl = forms.CharField(error_messages={"required": "不能为空!"})

    menustatus = forms.IntegerField(required=True, error_messages={"required": "不能为空!"})

    menuparentid = forms.IntegerField(required=True, error_messages={"required": "不能为空!"})

    isadmin = forms.IntegerField(required=True, error_messages={"required": "不能为空!"})

    orderfield = forms.CharField(error_messages={"required": "不能为空!"})

    icon = forms.CharField(error_messages={"required": "不能为空!"})


