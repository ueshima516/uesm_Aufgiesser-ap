import os, sys
import datetime
import uuid
import json

EASY, NORMAL, HARD = [1,0,0,0,1,0,0], [1,0,1,0,1,0,1], [1,1,1,0,1,1,1]
dic = {'EASY': EASY, 'NORMAL': NORMAL, 'HARD': HARD}


def  make_schedule(start_date, end_date, start_time, end_time, work_time, menu, mode):
  res = {}
  schedule_template = dic[mode] # スケジュールテンプレート
  delta = (end_date - start_date).days
  
  for idx in range(delta+1):
    flag = schedule_template[idx % 7] # テンプレート用の添字
    tar_date =  start_date + datetime.timedelta(days=idx)
  
    
    if(flag==1):
      res_ = {"date": tar_date.strftime('%Y/%m/%d'), "start_time": start_time, "end_time": end_time, "work_time": work_time, "menu": menu}
      uuid_ = str(uuid.uuid1())
      res[uuid_] = res_
    
  json_file = open('test.json', 'w')
  json.dump(res, json_file)

  return res


if __name__ == "__main__":

  start_date, end_date = datetime.date(2023,8,1), datetime.date(2023,8,31)
  start_time, end_time, work_time, menu, mode = "08:00", "08:30", "30", "running", "EASY"
  res = make_schedule(start_date, end_date, start_time, end_time, work_time, menu, mode)
  print(res)