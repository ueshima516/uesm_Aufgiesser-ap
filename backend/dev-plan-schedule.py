import os, sys
import datetime
import uuid
import json
import boto3

### DB要変更
target_dynamodb = boto3.resource('dynamodb').Table("fitshow_dev")

EASY, NORMAL, HARD = [1,0,0,0,1,0,0], [1,0,1,0,1,0,1], [1,1,1,0,1,1,1]
dic = {'EASY': EASY, 'NORMAL': NORMAL, 'HARD': HARD}


start_date, end_date = None, None #"2023-00-00"
start_time, end_time = None, None #"00:00"
menu, mode = None, None #"running", "EASY or NORMAL or HARD"
mail_address = None
is_done = None # タスクが完了したか？

DEBUG = False # eventの引数がないとき,main関数からのDebug時はTrueにして動作させる
def lambda_handler(event, context):

    ### --- ここの固定値の指定をeventからの変数で渡したい --- ###
    if(DEBUG==False):
      body = json.loads(event["body"])
      
      start_date = body["start_date"]
      end_date = body["end_date"]
      start_time = body["start_time"]
      end_time = body["end_time"]
      work_time = body["work_time"]
      menu = body["menu"]
      mode = body["mode"]
      mail_address = body["mail_address"] ## mail_address取得
      start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
      end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()

    else:
      start_date, end_date = datetime.date(2023,8,1), datetime.date(2023,8,31)
      start_time, end_time, work_time, menu, mode = "08:00", "08:30", "30", "running", "EASY"
    
      mail_address = "supp0rt@c_egg.com" # メアドがフロントから欲しい
    ### --- ここまで --- ###
    
    output_all_schedule = make_schedule(start_date, end_date, start_time, end_time, work_time, menu, mode)
    print(output_all_schedule)

    write_DynamoDB(mail_address, output_all_schedule)
    
    return {
      'statusCode': 200,
      "body": json.dumps({"output_text": output_all_schedule}),
      "isBase64Encoded": False,
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }

def  make_schedule(start_date, end_date, start_time, end_time, work_time, menu, mode):
  res = {}
  schedule_template = dic[mode] # スケジュールテンプレート
  delta = (end_date - start_date).days
  
  for idx in range(delta+1):
    flag = schedule_template[idx % 7] # テンプレート用の添字
    tar_date =  start_date + datetime.timedelta(days=idx)


    if(flag==1): # テンプレートに一致
      # もし一日に複数の予定が入るなら引数のmenuをリストで渡す. リストの要素数に対してfor文回して計画を生成-> schedule{uuid-1: {予定1}, uuid-2: {予定2}}みたいな感じ
      uuid_ = str(uuid.uuid1())
      # schedule = {uuid_: {"start_time": start_time, "end_time": end_time, "work_time": work_time, "menu": menu, "is_done": False}}
      
      schedule = [{"start_time": start_time, "end_time": end_time, "work_time": work_time, "menu": menu, "is_done": False, "UUID": uuid_}]
      ### 
      
      tar_date_key = tar_date.strftime('%Y-%m-%d')
      # tar_date_key = "x"+tar_date_key.replace("/", "") #強行策、ごめんなさい
      res[tar_date_key] = schedule

  return res


### テスト段階でタイムスタンプとuuid, スケジュールを書き込み
def write_DynamoDB(mail_address, schedule_dic):

  schedule_id = str(uuid.uuid1())
  schedule_res = {"mail_address": mail_address, "schedule_id": schedule_id}
  for date_key in schedule_dic:
    schedule_res[date_key] = schedule_dic[date_key]
  
  # schedule_res = {"mail_address": mail_address, "schedule_id": schedule_id, tar_date_key: schedule_dic}
  # print(schedule_res)
  # exit()
  target_dynamodb.put_item(
    Item=schedule_res
  )



if __name__ == "__main__":
  lambda_handler(event=None, context=None)