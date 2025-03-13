import os
import subprocess
import time
from datetime import timedelta

# import django
from celery import Celery, shared_task
from celery.schedules import crontab
from celery.signals import task_success
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail

# from django_celery_beat.models import CrontabSchedule, PeriodicTask
# from books.models import BorrowRecord
from django.utils.timezone import now  # 确保使用 Django 的时区



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MiDesign.settings')
# 确保 Django 被正确初始化
# django.setup()

app = Celery('MiDesign')
app.config_from_object('django.conf:settings')  # celery app 加载 settings中的配置

app.now = timezone.now  # 设置时间时区和django一样

# 加载每个django app下的tasks.py中的task任务
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

# **延迟导入模型，避免 Django 还没初始化就访问模型**
# import django
# django.setup()


# # 这个是定时任务
# app.conf.beat_schedule = {
#     'add-every-monday-morning': {
#         'task': 'send_verify_email',
#         # 'schedule': timedelta(seconds=10),
#         'schedule': crontab(hour=10, minute=7),
#         # 'schedule': crontab(hour=8, day_of_week=1),  # 每周一早八点
#
#         # 'args': (30, 20),
#
#     }
# }


@app.task(name='test')
def testCeleryApp(name):
    print(f"开始执行 Celery 任务: 处理 {name}")
    time.sleep(5)  # 模拟耗时任务
    result = f"Hello, {name}! Celery 任务已完成 "
    print(result)
    # return result


@shared_task
def testCeleryShared(name):
    print(f"开始执行 Celery 任务: 处理 {name}")
    time.sleep(5)  # 模拟耗时任务
    result = f"Hello, {name}! Celery 任务已完成 "
    print(result)
    # return result


@app.task(name='send_verify_email')
def send_verify_email(message, to_email):
    # 标题
    subject = "图书馆管理系统"
    print('定时任务启动')
    # mail.send_mail(
    #     subject='xx',  # 题目
    #     message='xx',  # 消息内容
    #     from_email='xxx@qq.com',  # 发送者[当前配置邮箱]
    #     recipient_list=['xxx@qq.com'],  # 接收者邮件列表
    # )
    # name = '周杰伦'
    # bookname = '西游记'
    # due_date = 5
    # to_email = ''
    # message = f"尊敬的%s用户您好！你借阅的%s,已不足%s天，请及时归还" % (name, bookname, due_date)
    # print('准备发送')
    # # 进行发送
    result = send_mail(subject,
                       message,
                       settings.EMAIL_FROM,
                       [to_email],
                       )
    print('打印发送结果')
    print(result)

    # return result

@shared_task
def periodic_task():
    print("八点执行发邮箱通知用户归还书籍")
    from books.models import BorrowRecord
    current_time = now()
    seven_days_later = current_time + timedelta(days=7)
    print(seven_days_later)
    borrowrecord = BorrowRecord.objects.filter(due_date__lte=seven_days_later)
    for i in borrowrecord:
        name = i.user.username
        bookname = i.book.title
        due_date = i.due_date  # 归还日期
        to_email = i.user.email
        # 计算还剩多少天
        days_left = (due_date - current_time).days  # 只计算天数部分

        # 判断是否是负数，表示逾期
        if days_left > 0:
            message = f"尊敬的{name}用户您好！你借阅的《{bookname}》，还有 {days_left} 天到期，请及时归还。"
        else:
            message = f"尊敬的{name}用户您好！你借阅的《{bookname}》，已逾期 {-days_left} 天，请尽快归还！"

        # 只有有邮箱时才发送
        if to_email:
            print(f"发送邮件至 {to_email}: {message}")
            send_verify_email.delay(message, to_email)

        print(message)

    # 实际任务逻辑放在这里，比如处理数据、发送邮件、同步数据等

# # 创建一个 Crontab 规则，比如每天凌晨 3 点执行
# cron_schedule, _ = CrontabSchedule.objects.get_or_create(
#     minute='30',
#     hour='10',
# )
#
# # 创建一个定时任务，关联到上面的 Crontab 规则和具体的 Celery 任务
# periodic_task_entry, _ = PeriodicTask.objects.get_or_create(
#     name='Daily Periodic Task',
#     task=periodic_task.name,  # 注意这里使用的是任务名，而非任务函数本身
#     crontab=cron_schedule,
# )


# 这个一个task
# @app.task(bind=True)
# def debug_task(self):
#     print('Request: {0!r}'.format(self.request))

# 异步执行这个task
# debug_task.delay()
