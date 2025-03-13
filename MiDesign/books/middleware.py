import time
import logging
import json
from django.utils.deprecation import MiddlewareMixin
import os

# 确保日志目录存在
LOG_DIR = "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# 配置日志记录
logger = logging.getLogger("api_logger")
logger.setLevel(logging.INFO)
log_file = os.path.join(LOG_DIR, "api_requests.log")
file_handler = logging.FileHandler(log_file)
formatter = logging.Formatter(
    "%(asctime)s - %(levelname)s - %(method)s - %(path)s - %(status_code)d - %(duration).4fs - params: %(params)s"
)
file_handler.setFormatter(formatter)
logger.addHandler(file_handler)

class RequestLoggerMiddleware(MiddlewareMixin):
    def process_request(self, request):
        """在请求开始时记录时间"""
        request.start_time = time.time()

    def process_response(self, request, response):
        """计算请求耗时，并记录日志"""
        if not hasattr(request, 'start_time'):
            return response  # 防止异常情况

        duration = time.time() - request.start_time  # 计算耗时
        method = request.method
        path = request.path
        status_code = response.status_code

        # 获取请求参数
        if method == 'GET':
            params = request.GET.dict()
        elif method == 'POST':
            params = request.POST.dict()
            try:
                body_data = json.loads(request.body.decode("utf-8"))
                params.update(body_data)
            except Exception:
                pass  # 忽略 JSON 解析错误
        else:
            params = {}

        # 记录日志
        logger.info("Request Logged", extra={
            "method": method,
            "path": path,
            "status_code": status_code,
            "duration": duration,
            "params": json.dumps(params, ensure_ascii=False)
        })

        return response
