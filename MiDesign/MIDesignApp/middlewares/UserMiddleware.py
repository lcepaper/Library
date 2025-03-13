from django.db.models import Q
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.utils.deprecation import MiddlewareMixin

from MiDesign.settings import BASE_DIR
from SysModel.models import Sysmenu


class LoginMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if not request.path in ['/index', '/login', '/ajaxlogin', '/register', '/menu', '/limit','/ceshi']:
            user = request.user
            if not user.is_authenticated:
                if request.is_ajax():
                    if str(request.accepted_types[0]) == "application/json":
                        errinfo = {
                            "status": 100,
                            "msg": '登录失败'
                        }
                        return JsonResponse(errinfo, safe=False)

                    response = HttpResponse()
                    response.content = "loginerror"
                    response.status_code = 200
                    return response
                else:
                    if request.path == '/admin':
                        strs = '?next=' + '/admin'
                        return redirect("/login" + strs)
                    else:
                        return redirect("/login")

            else:
                if "media" in request.path and ".jpg" in request.path:
                    img_path = str(BASE_DIR).replace("\\", "/") + "/" + request.path
                    fb = open(img_path, "rb")
                    image = fb.read()
                    fb.close()
                    return HttpResponse(image, content_type="image/png")
                # else:
                    # if not request.path in nolimit:
                    #     # 判断权限问题
                    #     if user.is_superuser is not True:
                    #         existpower = Sysmenu.objects.filter(Q(isadmin=0) & Q(menuurl=request.path))
                    #         if not (existpower):
                    #             if request.is_ajax():
                    #                 if str(request.accepted_types[0]) == "application/json":
                    #                     errinfo = {
                    #                         "status": 500,
                    #                         "msg": '暂无权限'
                    #                     }
                    #                     return JsonResponse(errinfo, safe=False)
                    #
                    #                 response = HttpResponse()
                    #                 response.content = "limiterror"
                    #                 response.status_code = 500
                    #                 return response
                    #             else:
                    #                 return redirect("/limit")
