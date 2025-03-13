"""MiDesign URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path, re_path

from MIDesignApp import views, UserCenterView
from MIDesignApp.UserCenterView import *
from books.views import *

from MIDesignApp.views import AdminView, UserRegisterView, UppwdView
from MIDesignApp import tests
from django.views import static
from django.conf.urls import url
from django.conf import settings
from django.views.static import serve

urlpatterns = [
    re_path(r'^$', AdminView.as_view()),
    path('login', views.login),  # 登录
    path('ajaxlogin', views.ajaxlogin),  # 登录
    path('loginout', views.loginout),  # 退出登录
    path("createUser", tests.createUser),
    path('admin', AdminView.as_view()),  # 首页
    # path('index', UserCenterView.as_view()),
    # path('processmodeling', UserCenterView.as_view()),
    path('register', UserRegisterView.as_view()),  # 注册
    path('uppwd', UppwdView.as_view()),  # 修改密码
    path('user', UserView.as_view()),  # 用户
    path('useredit', UserEditView.as_view()),  # 用户编辑
    path('paramssetting', ParamsSettingView.as_view()),  # 参数列表
    path('paramssettingedit', ParamsSettingEditView.as_view()),  # 参数编辑
    path('paramsSettingTypeEdit', ParamsSettingTypeEditView.as_view()),  # 参数分类
    path('setting', SettingView.as_view()),
    path('menumodule', MenuModuleView.as_view()),  # 系统菜单
    path('menumoduleedit', MenuModuleEditView.as_view()),  # 系统菜单编辑
    path('menu', MenuView.as_view()),  # json数据
    # path('project', ProjectView.as_view()),

    path('limit', views.limit),  # 500
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),

    path('upload', UploadView.as_view()),  # 上传

    path('books', BoosView.as_view()),
    path('bookedit', BookEditView.as_view()),
    path('borrowrecord', BorrowRecordView.as_view()),
    path('celerytest', CeleryTestView.as_view())
]
