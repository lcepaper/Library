from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.utils.deprecation import MiddlewareMixin


# 定义全局错误
class ExceptionMiddleware(MiddlewareMixin):
    # 如果注册多个process_exception函数，那么函数的执行顺序与注册的顺序相反。(其他中间件函数与注册顺序一致)
    # 中间件函数，用到哪个就写哪个，不需要写所有的中间件函数。
    def process_exception(self, request, exception):
        '''视图函数发生异常时调用'''
        print(request, exception)
        if request.method == "GET":
            return render(request, "eror.html", {'message': exception})
        else:
            return JsonResponse({'status': 400, 'msg': "系统提示错误:"+str(exception)}, safe=False)

        # return HttpResponse(exception, status=403)
