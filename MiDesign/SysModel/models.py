# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = True` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class Sysmenu(models.Model):
    menuid = models.AutoField(db_column='MenuId', primary_key=True)  # Field name made lowercase.
    menuname = models.CharField(db_column='MenuName', max_length=64)  # Field name made lowercase.
    menuurl = models.CharField(db_column='MenuUrl', max_length=64)  # Field name made lowercase.
    menustatus = models.IntegerField(db_column='MenuStatus')  # Field name made lowercase.
    menuparentid = models.IntegerField(db_column='MenuParentId')  # Field name made lowercase.
    createdate = models.DateTimeField(db_column='CreateDate', default=timezone.now)  # Field name made lowercase.
    creator = models.CharField(db_column='Creator', max_length=32)  # Field name made lowercase.
    orderfield = models.CharField(db_column='OrderField', max_length=32)  # Field name made lowercase.
    isadmin = models.IntegerField(db_column='IsAdmin')  # Field name made lowercase.
    icon = models.CharField(db_column='Icon', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'sysmenu'


class Syssetting(models.Model):
    setid = models.AutoField(db_column='SetId', primary_key=True)  # Field name made lowercase.
    setvalue = models.CharField(db_column='SetValue', max_length=32)  # Field name made lowercase.
    setname = models.CharField(db_column='SetName', max_length=32)  # Field name made lowercase.
    settype = models.CharField(db_column='SetType', max_length=32)  # Field name made lowercase.
    createdate = models.DateTimeField(_('createdate'))  # Field name made lowercase.
    isedit = models.IntegerField(db_column='IsEdit', default=1)  # Field name made lowercase.
    creator = models.CharField(db_column='Creator', max_length=64)  # Field name made lowercase.
    usestate = models.SmallIntegerField(db_column='UseState', default=1)  # Field name made lowercase.
    color = models.CharField(db_column='Color', max_length=32)

    class Meta:
        managed = True
        db_table = 'syssetting'


class Sysuserinfo(models.Model):
    uid = models.AutoField(db_column='UId', primary_key=True)  # Field name made lowercase.
    username = models.CharField(db_column='UserName', max_length=32, null=True)  # Field name made lowercase.
    usersex = models.CharField(db_column='UserSex', max_length=2, null=True)  # Field name made lowercase.
    depname = models.CharField(db_column='DepName', max_length=32, null=True)  # Field name made lowercase.
    phone = models.CharField(db_column='Phone', max_length=32, null=True)  # Field name made lowercase.
    accountid = models.ForeignKey('Userinfo', models.DO_NOTHING, db_column='accountid')  # Field name made lowercase.
    note = models.CharField(db_column='Note', max_length=1024, null=True)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'sysuserinfo'


class Userinfo(AbstractUser):
    creator = models.CharField(db_column='Creator', max_length=32)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'userinfo'


# class Experimentnfo(models.Model):
#     experimentstandard = models.CharField(db_column='ExperimentStandard', max_length=64)
#     exquipmentmodel = models.CharField(db_column='ExquipmentModel', max_length=255)
#     experimentname = models.CharField(db_column='ExperimentName', max_length=255)
#     createdate = models.DateTimeField(db_column="CreateDate", default=timezone.now)
#     createtor = models.CharField(db_column='Createtor', max_length=32)
#     # 用户id
#     userid = models.IntegerField(db_column="UserId")
#
#     class Meta:
#         db_table = 'Experimentnfo'
#
#     def __str__(self):
#         return self.experimentname


# class Exrecord(models.Model):
#     kindcatalogid = models.CharField(db_column="KindcatalogId", max_length=255)
#     materiacatalogid = models.CharField(db_column="MateriacatalogId", max_length=255)
#     # 材料名称
#     mname = models.CharField(db_column='mName', max_length=255)
#     remark = models.TextField(db_column='ReMark')
#     preparationprocess = models.TextField(db_column="Preparationprocess")
#     statusifno = models.TextField(db_column='StatusIfno')
#     component = models.TextField(db_column="component")
#     mno = models.CharField(db_column="mon", max_length=64)
#     eid = models.IntegerField(db_column='eid')
#     unit = models.CharField(db_column='unit', max_length=255)
#     valueunit = models.CharField(db_column="Valueunit", max_length=255)
#     valueinfo = models.CharField(db_column="valueinfo", max_length=255)
#     createtor = models.CharField(db_column='Createtor', max_length=32)
#     # 用户id
#     userid = models.IntegerField(db_column="UserId")
#
#     class Meta:
#         db_table = 'Exrecord'
#
#     def __str__(self):
#         return self.mname


# 材料信息表
class MaterialCredentials(models.Model):
    material_name = models.CharField(db_column="material_name", max_length=64)  # 材料名称
    material_type = models.CharField(db_column="material_type", max_length=64, null=True)  # 材料种类
    trademark = models.CharField(db_column="trademark", max_length=64, null=True)  # 牌号
    prepare_batches = models.CharField(db_column="prepare_batches", max_length=64, null=True)  # 制备批次/时间
    additional_notes = models.TextField(db_column="additional_notes")  # 其他备注
    preparation_process = models.TextField(db_column="preparation_process")  # 制备工艺
    sample_status = models.TextField(db_column="sample_status")  # 样品状态
    component_table = models.TextField(db_column="component_table")  # 成分表
    create_date = models.DateTimeField(db_column='create_date', default=timezone.now)  # 创建时间
    creator = models.CharField(db_column="creator", max_length=64)  # 创建人

    class Meta:
        db_table = "material_credentials"

    def __str__(self):
        return self.material_name


# 实验信息表
class ExperimentInformation(models.Model):
    experiment_name = models.CharField(db_column="experiment_name", max_length=64)  # 实验名称
    place = models.CharField(db_column="place", max_length=255, null=True)  # 地点
    unit = models.CharField(db_column="unit", max_length=255, null=True)  # 单位
    experimenters = models.CharField(db_column="experimenters", max_length=255, null=True)  # 实验人员
    device_name = models.CharField(db_column="device_name", max_length=255, null=True)  # 设备名称
    device_model = models.CharField(db_column="device_model", max_length=64, null=True)  # 设备型号
    device_parameters = models.TextField(db_column="device_parameters")  # 设备参数
    standard_number = models.CharField(db_column="standard_number", max_length=255, null=True)  # 标准号/非标准
    files = models.TextField(db_column="files")  # 标准号文件路径
    experimental_parameters = models.TextField(db_column="experimental_parameters")  # 实验参数
    start_time = models.DateTimeField(db_column='start_time', null=True, blank=True)  # 开始时间 'yyyy-MM-dd HH:mm:ss'
    end_time = models.DateTimeField(db_column='end_time', null=True, blank=True)  # 结束时间
    material_id = models.IntegerField("material_id")  # 材料id
    create_date = models.DateTimeField(db_column='create_date', default=timezone.now)  # 创建时间
    creator = models.CharField(db_column="creator", max_length=64)  # 创建人

    class Meta:
        db_table = "experiment_information"

    def __str__(self):
        return self.experiment_name


# 材料性能表
class MaterialPerformance(models.Model):
    performance_name = models.CharField(db_column="performance_name", max_length=64, null=True)  # 性能名称
    performance_value = models.CharField(db_column="performance_value", max_length=255, null=True)  # 性能参数
    files = models.TextField(db_column="files", null=True)  # 文件
    experimental_id = models.ForeignKey("ExperimentInformation", on_delete=models.CASCADE,
                                        related_name='performance')  # 实验id
    create_date = models.DateTimeField(db_column='create_date', default=timezone.now)  # 创建时间
    creator = models.CharField(db_column="creator", max_length=64)  # 创建人

    class Meta:
        db_table = "material_performance"

    def __str__(self):
        return self.performance_name


# 材料表征表
class MaterialCharacterization(models.Model):
    characterization_name = models.CharField(db_column="characterization_name", max_length=64, null=True)  # 材料表征
    characterization_value = models.TextField()  # 表征值
    experimental_id = models.ForeignKey("ExperimentInformation", on_delete=models.CASCADE,
                                        related_name="characterization")  # 实验id
    create_date = models.DateTimeField(db_column='create_date', default=timezone.now)  # 创建时间
    creator = models.CharField(db_column="creator", max_length=64)  # 创建人

    class Meta:
        db_table = "material_characterization"


# 性能分类配置表
class MaterialClassiication(models.Model):
    classificationname = models.CharField(db_column="ClassificationName", max_length=32, unique=True)
    createdate = models.DateTimeField(default=timezone.now)
    createTor = models.CharField(max_length=32)
    pid = models.ForeignKey('self',
                            on_delete=models.CASCADE,
                            related_name='classid',
                            null=True,
                            blank=True)
    path = models.CharField(max_length=240)

    # content = models.ManyToManyField("NewsContent", related_name='category')

    class Meta:
        db_table = 'MaterialClassiication'

    def __str__(self):
        return self.classificationname
