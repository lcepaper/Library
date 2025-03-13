@echo off

activate znzt && D: && cd C:\project\MianShiTest\MiDesign && celery -A MiDesign worker -l info -P gevent --time-limit=3600