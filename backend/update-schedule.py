import json
import boto3
TABLE_NAME='yu-test-db'


def Get(username, date, target_menu): # 今の状態から反転させるコード
    # DynamoDBに接続
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')
    
    # テーブルオブジェクトを取得
    table = dynamodb.Table(TABLE_NAME)
    
    # レコードの取得
    response = table.get_item(
        Key={
            'username': username,
            'date': date
        }
    )
    
    task_id = None # YYYY-MM-DDの何こめの種目（スクワットorランニングor腕立て）なのかを示すID
    print(response["Item"])
    print(response["Item"]["menu_list"])
    
    for id_, data in enumerate(response["Item"]["menu_list"]):
        if(data["menu"]==target_menu):
            task_id, is_done = id_, data["is_done"]
    
    print("task_id:", task_id, "menu:", response["Item"]["menu_list"][task_id]["menu"], "id_done:", response["Item"]["menu_list"][task_id]["is_done"])
    return {"is_done": is_done, "task_id": task_id}

def Update(username, date, target_menu):
    print(target_menu)
    # DynamoDBに接続してテーブル取得
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1').Table(TABLE_NAME)
    
    # 更新する属性と値を指定
    cur_data =  Get(username, date, target_menu)
    is_done, task_id = cur_data["is_done"], cur_data["task_id"]


    # 更新したいデータのis_doneを変更する
    query = f'SET menu_list[{task_id}].is_done = :val' # （リスト表記で）task_id番目の変更したい属性（menu_list）の要素（is_done）

    dynamodb.update_item(
        Key={
            'username': username,
            'date': date
        },
        UpdateExpression=query,
        ExpressionAttributeValues={
            ':val': not(is_done)
        }
    )

    
def lambda_handler(event, context):
    
    DEBUG = True
    

    username = "ふわぽめ"
    date = "20230901"
    target_menu = "SQUAT" 
    
    if(DEBUG==False):
        print(event["body"])
        body = json.loads(event["body"])
        username = body["username"]
        date =  body["date"]
        target_menu = body["menu"]
    
    
    Update(username, date, target_menu)


    return {
      'statusCode': 200,
      "body": json.dumps({"output_text": ""}),
      "isBase64Encoded": False,
      
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  