@echo off
cd /d "d:\AI automation\affilate web"
echo =================================================== >> pipeline_run.log
echo Pipeline execution started at: %date% %time% >> pipeline_run.log
py scripts/pipeline.py >> pipeline_run.log 2>&1
echo Pipeline execution finished at: %date% %time% >> pipeline_run.log
echo =================================================== >> pipeline_run.log
