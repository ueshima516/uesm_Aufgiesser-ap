import json
import boto3
import datetime
TABLE_NAME='fitshow_schedule'
# DynamoDBに接続
dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1').Table(TABLE_NAME)

FREQ = {
  "RUNNING": {
    "ONLY": {
          "EASY":  [1,0,0,0,1,0,0],
          "NORMAL": [1,0,0,1,0,0,1],
          "HARD": [1,0,1,0,1,0,1]
    },
    "WITH": {
          "EASY": [0, 0, 0, 1, 0, 0, 0],
          "NORMAL": [1, 0, 0, 1, 0, 0, 0],
          "HARD": [0, 1, 0, 1, 0, 1, 0]
    } 
  },
  "MUSCLE": {
      "ONLY":{
         "PUSHUP": [1, 0, 1, 0, 0, 1, 0],
         "SQUAT": [0, 1, 0, 1, 0, 1, 0],
         "SITUP": [1, 0, 1, 0, 0, 1, 0]

      },
      "WITH":{
        "PUSHUP": [1, 0, 1, 0, 0, 0, 0],
        "SQUAT": [1, 0, 0, 0, 0, 1, 0],
        "SITUP": [0, 0, 1, 0, 0, 1, 0]
      }
  
  }
}

INTENSITY = {
  "RUNNING": {
    "EASY": "15分",
    "NORMAL": "20分",
    "HARD": "30分"
  },
  "MUSCLE":{
    "EASY": "5回",
    "NORMAL": "10回",
    "HARD": "20回"
  }
}


def lambda_handler(event, context):
  DEBUG = True
  if(DEBUG==False):
    body = json.loads(event["body"])
    start_date = body["start_date"]
    end_date = body["end_date"]
    start_time = body["start_time"]
    menu = body["menu"]
    mode = body["mode"]
    username = body["username"] ## username取得
    
    start_date = datetime.datetime.strptime(start_date, '%Y-%m-%d').date()
    end_date = datetime.datetime.strptime(end_date, '%Y-%m-%d').date()

  else:
    start_date, end_date = datetime.date(2023,9,1), datetime.date(2023,9,8)
    start_time, menu, mode = "08:00", "RUNNING++", "NORMAL"
    username = "ふわぽめ" # メアドがフロントから欲しい
  
  plan_schedule(username, start_date, end_date, start_time, menu, mode)
  

def plan_schedule(username, start_date, end_date, start_time, menu, mode):
  dic = {}

  if(menu=="RUNNING"):
    dic.update({"RUNNING": FREQ["RUNNING"]["ONLY"][mode]})
  elif(menu=="MUSCLE"):
    dic.update(FREQ["MUSCLE"]["ONLY"])
  else:
    dic.update({"RUNNING": FREQ["RUNNING"]["WITH"][mode]})
    dic.update(FREQ["MUSCLE"]["WITH"])
  print(dic)

  delta = (end_date - start_date).days + 1
  
  for idx in range(delta):
    schedule = []
    tar_date =  start_date + datetime.timedelta(days=idx)
    for menu_, flag_ in dic.items():
      flag = flag_[idx % 7] # テンプレート用の添字

      if(flag==1): # テンプレートに一致
        
        menu_key = menu_ if menu_ == "RUNNING" else "MUSCLE"
        intensity = INTENSITY[menu_key][mode]

        sch_ = {"intensity": intensity, "is_done": False, "menu": menu_}
        schedule.append(sch_)

    tar_date_key = tar_date.strftime('%Y%m%d')
    schedule_res = {"username": username, "date": tar_date_key, "menu_list": schedule}
    
    if(schedule != []):
      print(schedule_res)
      # ここで書き込み
      dynamodb.put_item(
        Item=schedule_res
      )   
    # exit()


