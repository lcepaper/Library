import logging
from datetime import datetime
from django.core.management.base import BaseCommand
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore, register_job, register_events

from books.celery import periodic_task, send_verify_email

logger = logging.getLogger(__name__)


def my_scheduled_job():
    print(f"任务执行时间：{datetime.now()} - 运行成功！")


class Command(BaseCommand):
    help = "启动 APScheduler 调度任务"

    def handle(self, *args, **kwargs):
        scheduler = BackgroundScheduler()
        scheduler.add_jobstore(DjangoJobStore(), "default")

        # 每天早上10:00执行
        scheduler.add_job(
            # my_scheduled_job,
            # send_verify_email.delay,
            periodic_task.delay,
            trigger=CronTrigger(hour=8, minute=0),
            id="my_scheduled_job",  # 任务ID
            replace_existing=True
        )

        register_events(scheduler)
        scheduler.start()

        self.stdout.write(self.style.SUCCESS('APScheduler 已启动！按 Ctrl+C 退出'))

        try:
            while True:
                pass
        except KeyboardInterrupt:
            scheduler.shutdown()
            self.stdout.write(self.style.WARNING('APScheduler 已关闭'))
