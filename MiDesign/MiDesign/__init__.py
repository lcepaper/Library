from __future__ import absolute_import, unicode_literals
import  pymysql
# # »√ Django ∑¢œ÷ Celery
# from books.celery import app as celery_app


pymysql.install_as_MySQLdb()
# __all__ = ('celery_app',)



# this will make sure the app is always imported when
# django starts so that shared_task will use this app.
