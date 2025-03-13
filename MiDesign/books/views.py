import json
from datetime import timedelta

from django.db import transaction
from django.shortcuts import render

# Create your views here.
from django.utils import timezone
from django.utils.timezone import now
from django.views import View
from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required

from MIDesignApp.models import UserFormDto
from MIDesignApp.tools import PageHelp, getuuid
from SysModel.models import Sysuserinfo, Userinfo
from django.db.models import F, Q
from django.http import JsonResponse,QueryDict

from books.celery import testCeleryApp, testCeleryShared, send_verify_email
from books.forms import BookForm
from books.models import Book, BorrowRecord
from django.core.mail import send_mail


class BoosView(View):
    '''用户列表视图，操作'''
    template_name = "books/books.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        pindex = request.GET.get('pageindex')
        if pindex:
            """执行分页逻辑"""
            try:
                pindex = int(pindex)
                psize = int(request.GET.get('pagesize'))
                options = request.GET.get('searchParams')
                # 查询对象
                query = Book.objects
                # 排序
                orderfield = request.GET.get('field')
                ordertype = request.GET.get('order')
                orders = ("" if ordertype == "asc" else "-") + (orderfield if orderfield else 'created_at')
                # 定义搜索条件
                parms = PageHelp.getOptions(options)
                startRow = (pindex - 1) * psize
                endRow = psize * pindex

                # 格式化时间
                query = query.extra(
                    select={"created_at": "DATE_FORMAT(created_at, '%%Y-%%m-%%d %%H:%%i:%%s')", "updated_at": "DATE_FORMAT(created_at, '%%Y-%%m-%%d %%H:%%i:%%s')"},)
                query = query.filter(**parms).values('id', 'title', 'author',
                                                                              'publisher',
                                                                              'publish_date',
                                                                              'total_copies',
                                                                              'available_copies',
                                                                              'created_at',
                                                     'updated_at'
                                                                              )
                counts = query.count()
                # 定义分页条件
                queryresult = query.order_by(orders)[startRow:endRow]
                # 获取读取数据总条数

                result = {
                    "status": 0,
                    "msg": '',
                    'count': counts,
                    'data': list(queryresult)
                }
            except Exception as exc:

                result = {
                    "status": -100,
                    "msg": "接口异常:数据查询失败"
                }
            return JsonResponse(result)
        else:
            return render(request, self.template_name, {"suid": getuuid()})

    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        return render(request, self.template_name)

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def delete(self, request):
        result = {'status': 200, 'msg': 'success'}
        DELETE = QueryDict(request.body)
        id = DELETE.get('id')

        try:
            Book.objects.filter(id=id).delete()
        except Exception as exc:
            print("删除失败")
            result['status'] = 400
            result['msg'] = '删除失败'

        return JsonResponse(result, safe=False)


class BookEditView(View):
    """用户编辑"""
    template_name = "books/BookEdit.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        '''读取编辑用户信息'''
        id = int(request.GET.get('id'))
        queryresult = {}
        if id > 0:

            queryresult = Book.objects.extra(
                select={"publish_date": "DATE_FORMAT(publish_date, '%%Y-%%m-%%d')"}).filter(id=id).values('id', 'title', 'author',
                                                                              'publisher',
                                                                              'publish_date',
                                                                              'total_copies',
                                                                              'available_copies',).first()
            return render(request, self.template_name, {'form': json.dumps(queryresult), "suid": getuuid()})
        else:
            return render(request, self.template_name, {'form': json.dumps(queryresult), "suid": getuuid()})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):
        '''用户表单提交'''
        self.form = BookForm(request.POST)
        errinfo = {
            "status": 200,
            "msg": ''
        }
        # 使用form表单验证
        if self.form.is_valid():

            data = self.form.cleaned_data  # 校验成功的值，会放在cleaned_data里。

            id = data.pop("id")

            # 判断是否是编辑data["id"]
            if id > 0:
                """编辑信息"""
                Book.objects.filter(id=id).update(**data)

            else:
                Book.objects.create(**data)
        else:
            print(self.form.errors)
            errinfo["status"] = 400
            errinfo["msg"] = '提交失败'
            errinfo["listErr"] = self.form.errors
        return JsonResponse(errinfo, safe=False)




class BorrowRecordView(View):

    template_name = "books/BorrowRecord.html"

    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        id = request.GET.get('id')
        userquery = Userinfo.objects.all().annotate(title=F('username'),value=F('id')).values('value', 'title')
        # query = Userinfo.objects.extra(
        #     select={"date_joined": "DATE_FORMAT(date_joined, '%%Y-%%m-%%d %%H:%%i:%%s')"})
        # queryresult = query.filter(id=id).annotate(
        #     phone=F('sysuserinfo__phone'), usersex=F('sysuserinfo__usersex'),
        #     depname=F('sysuserinfo__depname'),
        #     realname=F('sysuserinfo__username'),
        #     uid=F('id'),
        #     note=F('sysuserinfo__note')).values('uid', 'username', 'is_superuser', 'is_active', 'email',
        #                                         'phone',
        #                                         'usersex',
        #                                         'depname',
        #                                         'realname',
        #                                         'note'
        #                                         ).first()
        borrow_list = [i['user_id'] for i in list(BorrowRecord.objects.filter(book_id=id).values('user_id'))]

        return render(request, self.template_name, {"suid": getuuid(),'userlis': json.dumps(list(userquery)),'id': id, 'borrow_list': json.dumps(borrow_list)})

    @transaction.atomic
    @method_decorator(login_required(login_url='/login'))
    def post(self, request, *args, **kwargs):

        errinfo = {
            "status": 200,
            "msg": ''
        }

        raw_data = json.loads(request.body)

        # 当前图书的id
        book_id = raw_data.get("id")
        user_dicts = raw_data.get("uselis", [])
        # 借读中的用户
        user_lis = {int(i['value']) for i in user_dicts}

        # 获取图书实例
        # book = Book.objects.get(id=book_id)
        # 获取当前书籍所有借阅的查询集
        borrow_records = BorrowRecord.objects.filter(book_id=book_id)
        # 获取已存在的借阅用户
        usequery = {i['user_id'] for i in borrow_records.values('user_id')}

        # borrow_records = BorrowRecord.objects.filter(book_id=book_id).select_related('user')

        # 获取交集的用户，代表当前书籍已经存在借阅记录，不在进行添加
        new_users = user_lis - usequery

        # 在批量添加前判断可借数量是否超过
        # 加锁，防止并发修改库存
        try:
            book = Book.objects.select_for_update().get(id=book_id)
        except Book.DoesNotExist:
            return JsonResponse({"status": 400, "msg": "图书不存在"}, safe=False)

        # 新增借阅用户，减少可借数量
        if book.available_copies > len(new_users):
            book.available_copies = book.available_copies - len(new_users)
            book.save()
            borrow_records_to_create = [
                BorrowRecord(
                    user_id=user_id,
                    book_id=book_id,
                    borrow_date=timezone.now(),
                    due_date=timezone.now() + timedelta(days=30) # 手动填充,疑似在批量添加时不会促发重新的save方法导致需要手动填充到期日期
                ) for user_id in new_users
            ]
            if borrow_records_to_create:
                BorrowRecord.objects.bulk_create(borrow_records_to_create)  # 批量插入
        else:
            errinfo = {
                "status": 400,
                "msg": '当然库存不足'
            }
        # # 遍历添加时过滤已经存在的借阅记录
        # for i in user_lis:
        #     if i in new_users:
        #         continue
        #     else:
        #         data['user_id'] = i
        #         data['book_id'] = book_id
        #         data['borrow_date'] = timezone.now()
        #
        #         BorrowRecord.objects.create(**data)

        # 删除已归还的借阅用户s
        deleted_count = usequery - user_lis

        if deleted_count:
            BorrowRecord.objects.filter(user_id__in=deleted_count, book_id=book_id).delete()
            # book.available_copies = book.available_copies + len(deleted_count)
            # book.save()

            book.available_copies = min(book.total_copies, book.available_copies + len(deleted_count))
            book.save(update_fields=['available_copies'])

        return JsonResponse(errinfo, safe=False)


class CeleryTestView(View):


    @method_decorator(login_required(login_url='/login'))
    def get(self, request, *args, **kwargs):
        # testCeleryApp.delay(request.user.username + "任务11111111")
        # testCeleryShared.delay(request.user.username + "任务2222222")

        # send_verify_email.delay('周杰伦', '西游记', 3, '3110385493@qq.com')
        # send_verify_email.delay()
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

            print(message)

        # 返回 JSON 响应，避免返回 None
        return JsonResponse({"message": "Celery tasks started successfully"})