@echo off

activate znzt && C: && cd C:\project\MianShiTest\MiDesign && celery -A books worker -l info -P gevent --time-limit=3600