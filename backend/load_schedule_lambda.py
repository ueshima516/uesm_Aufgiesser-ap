import json
import boto3

# 後々 data は DBから読み込めるようにする
data = {"output_text": {"b25f387c-2155-11ee-b258-825e158fd254": {"date": "2023/08/01", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3ac0-2155-11ee-b258-825e158fd254": {"date": "2023/08/05", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3bba-2155-11ee-b258-825e158fd254": {"date": "2023/08/08", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3c96-2155-11ee-b258-825e158fd254": {"date": "2023/08/12", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3d5e-2155-11ee-b258-825e158fd254": {"date": "2023/08/15", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}}}
TABLE_NAME = "fitshow_dev"



def scan_db():
    dynamodb = boto3.resource('dynamodb').Table(TABLE_NAME)
    # response = dynamodb.scan()
    # print(response["Items"])
    response = dynamodb.scan()
    return response["Items"]

def scan_db_with_address(target_mail_address):
    dynamodb = boto3.resource('dynamodb').Table(TABLE_NAME)
    # パーティションキーを使ってデータを取得するクエリを作成する
    response = dynamodb.query(
        KeyConditionExpression='mail_address = :key_value',  # パーティションキー名は自分のテーブルのパーティションキー名に変更してね
        ExpressionAttributeValues={
            ':key_value': target_mail_address  # 検索したいパーティションキーの値を指定してね
        }
    )
        
    return response["Items"]


def search_element_by_date(data, date_value):
    dic = {}
    for key, inner_dict in data.items():
        if inner_dict.get("date") == date_value:
          dic.update({key: inner_dict})
    return dic


def lambda_handler(event, context):
    """ DATEで日付を指定して要素を検索する 
    DATE_TO_SEARCH = "2023/08/01"
    result = search_element_by_date(data["output_text"], DATE_TO_SEARCH)
    """
    ALL_SCAN = False # DBの全データを読み込むならTrue, メアドで抽出するならFalse
    result = None
    body = json.loads(event["body"])
    # print(event["body"], body, type(body))
    target_mail_address = body["mail_address"]
   
    if(ALL_SCAN==True):
        result = scan_db()
    else:
        # target_mail_address = "xx@test.com" ### <- 引っ張ってくる
        result = scan_db_with_address(target_mail_address)
    
    # 検索結果を出力する
    if result != {}:
        print(result)
    else:
        print("指定したメールアドレスの要素は見つかりませんでした。")
    
    return {
        'statusCode': 200,
        'body': json.dumps({"output_text": result}),
        "headers": {
          "Access-Control-Allow-Origin": "*"
        }
    }
