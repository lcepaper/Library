# models.py
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinLengthValidator, MaxLengthValidator
from django.utils import timezone
from datetime import timedelta

User = get_user_model()


class Book(models.Model):

    # 基础信息
    title = models.CharField(
        max_length=200,
        verbose_name="书名",
        help_text="请输入完整的图书名称"
    )
    author = models.CharField(
        max_length=100,
        verbose_name="作者",
        help_text="格式：姓 名（如：余华）"
    )

    # 出版信息
    publisher = models.CharField(
        max_length=100,
        verbose_name="出版社"
    )
    publish_date = models.DateField(
        verbose_name="出版日期"
    )

    # 库存管理              非负数整数必须大于或等于0，添加就默认存在一本
    total_copies = models.PositiveIntegerField(
        default=1,
        verbose_name="总数量",
        help_text="该图书的总馆藏数量"
    )
    available_copies = models.PositiveIntegerField(
        default=1,
        verbose_name="可借数量"
    )

    # 时间戳
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="创建时间"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="更新时间"
    )

    # 打印模型类默认输出结果
    def __str__(self):
        return self.title

    class Meta:
        db_table = 'book'  # 指明数据库表名


    def save(self, *args, **kwargs):
        # 确保可用数量不超过总数量
        if self.available_copies > self.total_copies:
            self.available_copies = self.total_copies
        super().save(*args, **kwargs)


class BorrowRecord(models.Model):
    class Meta:

        ordering = ['-borrow_date']
        db_table = 'borrowrecord'


    STATUS_CHOICES = (
        ('BORROWED', '借阅中'),
        ('RETURNED', '已归还'),
        ('OVERDUE', '已逾期'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='borrow_records',
        verbose_name="借阅用户"
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE,
        related_name='borrow_history',
        verbose_name="借阅图书"
    )

    # 时间信息
    borrow_date = models.DateTimeField(
        auto_now_add=True,
        verbose_name="借阅时间"
    )
    due_date = models.DateTimeField(
        verbose_name="应还日期"
    )
    return_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name="实际归还时间"
    )

    # 状态管理
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='BORROWED',
        verbose_name="借阅状态"
    )

    def save(self, *args, **kwargs):
        # 自动计算应还日期（借阅后30天）
        if not self.due_date:
            self.due_date = timezone.now() + timedelta(days=30)

        # 自动更新状态
        if self.return_date and self.status != 'RETURNED':
            self.status = 'RETURNED'
        elif timezone.now() > self.due_date and self.status == 'BORROWED':
            self.status = 'OVERDUE'

        super().save(*args, **kwargs)


class Notification(models.Model):
    class Meta:

        ordering = ['-created_at']
        db_table = 'notification'

    NOTIFICATION_TYPES = (
        ('DUE_REMINDER', '到期提醒'),
        ('SYSTEM', '系统通知'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='notifications',
        verbose_name="接收用户"
    )
    message = models.TextField(
        verbose_name="通知内容"
    )
    notification_type = models.CharField(
        max_length=20,
        choices=NOTIFICATION_TYPES,
        default='DUE_REMINDER',
        verbose_name="通知类型"
    )
    is_read = models.BooleanField(
        default=False,
        verbose_name="已读状态"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="创建时间"
    )
    related_record = models.ForeignKey(
        BorrowRecord,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="关联借阅记录"
    )

    def __str__(self):
        return f"{self.get_notification_type_display()} - {self.user.username}"


# class APILog(models.Model):
#     class Meta:
#
#         db_table = 'apiLog'
#
#     path = models.CharField(
#         max_length=255,
#         verbose_name="请求路径"
#     )
#     method = models.CharField(
#         max_length=10,
#         verbose_name="HTTP方法"
#     )
#     params = models.JSONField(
#         default=dict,
#         verbose_name="请求参数"
#     )
#     duration = models.FloatField(
#         verbose_name="处理时长（秒）"
#     )
#     status_code = models.IntegerField(
#         verbose_name="状态码"
#     )
#     user = models.ForeignKey(
#         User,
#         null=True,
#         blank=True,
#         on_delete=models.SET_NULL,
#         verbose_name="操作用户"
#     )
#     created_at = models.DateTimeField(
#         auto_now_add=True,
#         verbose_name="记录时间"
#     )
#
#     def __str__(self):
#         return f"{self.method} {self.path} - {self.status_code}"
