import json
import boto3
TABLE_NAME='fitshow_dev'


def Get(mail_address, schedule_id, TARGET, uuid): # 今の状態から反転させるコード
    # DynamoDBに接続
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')
    
    # テーブルオブジェクトを取得
    table = dynamodb.Table(TABLE_NAME)
    
    # レコードの取得
    response = table.get_item(
        Key={
            'mail_address': mail_address,
            'schedule_id': schedule_id
        }
    )
    # keys=(response['Item']).keys()
    # print(
    #     [type(k) for k in keys]
    #     )
    
    task_id = None # YYYY-MM-DDの何こめの予定かを示すID
    for id_, data in enumerate(response["Item"][TARGET]):
        if(data["UUID"]==uuid):
            task_id = id_
        # print(data["UUID"], uuid, task_id)
                
    # exit()
    
    # "fuwapome"の"is_done"の値を取得
    is_done = response['Item'][TARGET][task_id]['is_done']
    # print("check:", is_done)
   
    return {"is_done": is_done, "task_id": task_id}
    # return(is_done)

def Update(mail_address, schedule_id, TARGET, uuid):
    print(TARGET)
    # DynamoDBに接続
    dynamodb = boto3.resource('dynamodb', region_name='ap-northeast-1')
    # テーブルオブジェクトを取得
    table = dynamodb.Table(TABLE_NAME)
    
    # 更新する属性と値を指定
    # projection-expression "#sw" \
    # expression-attribute-names '{"#sw":"Safety.Warning"}'
    cur_data =  Get(mail_address, schedule_id, TARGET, uuid)
    is_done, task_id = cur_data["is_done"], cur_data["task_id"]


    attr_names = {'#target': f'{TARGET}'}
    update_expression = f'SET #target[{task_id}].is_done = :val'

    expression_attribute_values = {
        ':val': not(is_done)
    }
    
    # レコードの更新
    response = table.update_item(
        Key={
            'mail_address': mail_address,
            'schedule_id': schedule_id
        },
        UpdateExpression=update_expression,
        ExpressionAttributeNames=attr_names,  #これを追加
        ExpressionAttributeValues=expression_attribute_values
    )

    
    
def lambda_handler(event, context):
    
    DEBUG = False
    
    TARGET = "2023-08-01"
    mail_address = "てすてす@test.com"
    schedule_id = "term1"
    uuid = "yyyyy-yyyyy"
    
    if(DEBUG==False):
        print(event["body"])
        body = json.loads(event["body"])
        mail_address = body["mail_address"]
        schedule_id =  body["schedule_id"]
        uuid = body["UUID"]
        TARGET = body["target_date"]
        # print(body)
        # exit()
    bef_message  = "更新前の値:{}".format(Get(mail_address, schedule_id, TARGET, uuid)["is_done"])
    print(bef_message) 
    
    Update(mail_address, schedule_id, TARGET, uuid)
    
    aft_message = "更新後の値:{} 裏返ってたらOK!".format(Get(mail_address, schedule_id, TARGET, uuid)["is_done"])
    print(aft_message)

    return {
      'statusCode': 200,
      "body": json.dumps({"output_text": str(uuid) + ": " + bef_message + " " + aft_message},  ensure_ascii=False),
      "isBase64Encoded": False,
      
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  