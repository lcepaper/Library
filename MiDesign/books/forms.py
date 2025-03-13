from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import date


class BookForm(forms.Form):
    """图书信息表单（修正类名反映实际用途）"""

    id = forms.IntegerField(required=True)

    # 基础信息字段组
    title = forms.CharField(
        label="书名",
        max_length=200,
        error_messages={
            "required": "书名必须填写",
            "max_length": "书名长度不能超过200个字符"
        },

    )

    # 作者信息字段
    author = forms.CharField(
        label="作者",
        required=True,
        error_messages={"required": "作者信息必须填写"},

    )

    # 出版信息字段组
    publisher = forms.CharField(
        label="出版社",
        required=True,
        error_messages={"required": "必须填写出版社名称"},
        help_text="填写出版社全称"
    )

    publish_date = forms.DateField(
        label="出版日期",
        required=False,
        validators=[
            # 限制日期不超过当前日期
            MaxValueValidator(
                limit_value=date.today,
                message="出版日期不能晚于今天"
            )
        ],

    )

    # 库存管理字段组
    total_copies = forms.IntegerField(
        label="总库存量",
        required=False,
        min_value=0,
        initial=1,
        validators=[MinValueValidator(0)],
        error_messages={
            "min_value": "库存量不能小于0",
            "invalid": "请输入有效数字"
        }
    )

    available_copies = forms.IntegerField(
        label="可借数量",
        required=False,
        min_value=0,
        validators=[MinValueValidator(0)],
        error_messages={
            "min_value": "可借数量不能小于0",
            "invalid": "请输入有效数字"
        }
    )

    # 表单数据进行提交前进行校验，并将校验过后的数据返回
    def clean(self):
        """全局验证逻辑"""
        cleaned_data = super().clean()

        # 验证可借数量不超过总库存
        total = cleaned_data.get('total_copies', 0)
        available = cleaned_data.get('available_copies', 0)

        if total is not None and available is not None:
            if available > total:
                self.add_error(
                    'available_copies',
                    "可借数量不能超过总库存量"
                )

        # 自动填充默认值逻辑
        # if not cleaned_data.get('total_copies'):
        #     cleaned_data['total_copies'] = 1
        #
        # if 'available_copies' not in cleaned_data:
        #     cleaned_data['available_copies'] = cleaned_data['total_copies']

        return cleaned_data

