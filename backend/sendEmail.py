import boto3
from email.header import Header
import json
from datetime import date
import datetime

SENDER_ADDRESS = 'no-reply@fitshow-ap.com'
SENDER_NAME = 'FitShow'

ses = boto3.client('ses', region_name='ap-northeast-1')
today_list = []


def lambda_handler(event, context):
    subject = '[FitShow]本日の運動スケジュール'
    base_msg = '本日の運動スケジュールです。\n\n'
    res = scan_db()
    now_time = int(get_japanese_time())
    # now_time = 2000
        
    for x in res:
        if(x["date"] == get_today_yyyymmdd()):
            today_list.append(x);
    print(today_list)
    
    for task in today_list:
        target_time = int(task["start_time"].replace(":", ""))
        if(now_time <= target_time and target_time<now_time+60):
            to_address = task["username"]
    
            msg_2 = "開始時刻 " + task["start_time"] + "\n"
            msg = base_msg + msg_2
            for i,menu_ in enumerate(task["menu_list"]):
                msg += "・" + menu_["menu"] + " " + menu_["intensity"] + "\n"
            
    msg += "\n\n" + "FitShowで確認しよう！：" + "https://fitshow-ap.com/"
    send(to_address, subject, msg)
    
    

def send(to_address, subject: str, body: str):
    display_name = '{0}<{1}>'.format(
        Header(SENDER_NAME, 'utf-8').encode(),
        SENDER_ADDRESS
    )

    ses.send_email(
        Source=display_name,
        Destination={
            'ToAddresses': [to_address]
        },
        Message={
            'Subject': {
                'Data': subject
            },
            'Body': {
                'Text': {
                    'Data': body
                }
            }
        }
    )
    


# 後々 data は DBから読み込めるようにする
data = {"output_text": {"b25f387c-2155-11ee-b258-825e158fd254": {"date": "2023/08/01", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3ac0-2155-11ee-b258-825e158fd254": {"date": "2023/08/05", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3bba-2155-11ee-b258-825e158fd254": {"date": "2023/08/08", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3c96-2155-11ee-b258-825e158fd254": {"date": "2023/08/12", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3d5e-2155-11ee-b258-825e158fd254": {"date": "2023/08/15", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}}}
TABLE_NAME = "fitshow_schedule"


def scan_db():
    dynamodb = boto3.resource('dynamodb').Table(TABLE_NAME)
    response = dynamodb.scan()
    
    
    return response["Items"]
    


def get_today_yyyymmdd():
    today = date.today()
    return today.strftime('%Y%m%d')



def get_japanese_time():
    # 現在の日時を取得
    now = datetime.datetime.now()

    # 日本時刻に変換
    japan_time = now.astimezone(datetime.timezone(datetime.timedelta(hours=9)))

    # 時刻を4桁数字で表記
    formatted_time = japan_time.strftime("%H%M")
    return formatted_time