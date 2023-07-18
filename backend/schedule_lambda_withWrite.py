import os, sys
import datetime
import uuid
import json
import boto3

### DB要変更
target_dynamodb = boto3.resource('dynamodb').Table("yuasa-translate-history")

EASY, NORMAL, HARD = [1,0,0,0,1,0,0], [1,0,1,0,1,0,1], [1,1,1,0,1,1,1]
dic = {'EASY': EASY, 'NORMAL': NORMAL, 'HARD': HARD}


start_date, end_date = None, None #"2023-00-00"
start_time, end_time = None, None #"00:00"
menu, mode = None, None #"running", "EASY or NORMAL or HARD"


def lambda_handler(event, context):
    ### --- ここの固定値の指定をeventからの変数で渡したい --- ###
    # start_date, end_date = datetime.date(2023,8,1), datetime.date(2023,8,31)
    # start_time, end_time, work_time, menu, mode = "08:00", "08:30", "30", "running", "EASY"

    body = json.loads(event["body"])
    
    start_date = body["start_date"]
    end_date = body["end_date"]
    start_time = body["start_time"]
    end_time = body["end_time"]
    work_time = body["work_time"]
    menu = body["menu"]
    mode = body["mode"]

    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
    end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()
    
    ### --- ここまで --- ###
    
    output_all_schedule = make_schedule(start_date, end_date, start_time, end_time, work_time, menu, mode)

    print(output_all_schedule)
    # write_DynamoDB(output_all_schedule)
    
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
  
    
    if(flag==1):
      res_ = {"date": tar_date.strftime('%Y/%m/%d'), "start_time": start_time, "end_time": end_time, "work_time": work_time, "menu": menu}
      uuid_ = str(uuid.uuid1())
      res[uuid_] = res_
  return res


### テスト段階でタイムスタンプとuuid, スケジュールを書き込み
def write_DynamoDB(schedule_dic):
  
  for key_, value_ in schedule_dic.items():
    # print(key_, uuid_)
    timestamp = str(datetime.datetime.now())
    # print(timestamp)
    target_dynamodb.put_item(
      Item={
            'timestamp': timestamp,
            'input_text': key_,
            'output_text': value_
        }
    )



if __name__ == "__main__":
  lambda_handler(event=None, context=None)