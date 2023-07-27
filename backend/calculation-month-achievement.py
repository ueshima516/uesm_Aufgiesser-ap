import json
import datetime
import boto3

TABLE_NAME = "fitshow_schedule"


def extract_last_month_schedules(target_username):
    """
    return List[
      {
        "username": str,
        "date": str,
        "mode": str,
        "menu_list": [
          {"intensity": str, "menu": str, "is_done": bool},
        ]
      }
    ]
    """

    # データベースから指定したユーザーのスケジュールを取得する
    dynamodb = boto3.resource('dynamodb').Table(TABLE_NAME)

    # 先月の年月を計算する
    # 日本時間の取得方法の参考記事🧀🐁: https://qiita.com/keisuke0508/items/df2594770d63bf124ccd
    DIFF_JST_FROM_UTC = 9
    now = datetime.datetime.utcnow() + datetime.timedelta(hours=DIFF_JST_FROM_UTC)

    today = now.date() #今日
    end_date = today.replace(day=1) - datetime.timedelta(days=1) # 先月最終日
    start_date=end_date.replace(day=1).strftime("%Y%m%d") # 先月1日 '20230601'
    end_date=end_date.strftime("%Y%m%d")

    # 先月のスケジュールを抽出
    response = dynamodb.query(
        KeyConditionExpression='username = :username AND #date BETWEEN :sk_start AND :sk_end',
        ExpressionAttributeNames={
            '#date': 'date'   # ソートキー名が"date"の場合、予約語を避けるためにExpressionAttributeNamesで指定する必要があります
        },
        ExpressionAttributeValues={
            ':username': str(target_username),
            ':sk_start': str(start_date),
            ':sk_end': str(end_date)
        }
    )
    return response["Items"]


def calculate_monthly_achievement(target_username):

    # 先月のスケジュールを取得🔍
    schedules = extract_last_month_schedules(target_username)

    total_schedules = {
        "EASY": 0,
        "NORMAL": 0,
        "HARD": 0,
    }
    done_schedules = {
        "EASY": 0,
        "NORMAL": 0,
        "HARD": 0,
    }
    achievement_rate = {
        "EASY": 0,
        "NORMAL": 0,
        "HARD": 0,
    }
    total_achievement_ratio = 0

    for schedule in schedules:
      menu_list = schedule["menu_list"]
      mode = schedule["mode"] #" EASY"とか
      total_schedules[mode] += len(menu_list) #1日の
      done_schedules[mode] += sum(1 for menu in menu_list if menu['is_done'])

    # 先月の達成率を計算
    total_cnt = 0
    done_cnt = 0

    for mode in achievement_rate.keys():
      if total_schedules[mode] > 0:
          total_cnt += total_schedules[mode]
          done_cnt += done_schedules[mode]
          achievement_rate[mode] = (done_schedules[mode] / total_schedules[mode]) * 100
      else:
          achievement_rate[mode] = None

    if total_cnt > 0:
       total_achievement_ratio = done_cnt / total_cnt * 100
    else:
       total_achievement_ratio = None
       
    # ランクを割り当てる（ランクの割り当て方法は適宜設定）
    # rank = "A" if achievement_rate >= 90 else "B" if achievement_rate >= 60 else "C"

    response = {
        "total_achievement_ratio": total_achievement_ratio,
        "mode_achievement_ratios": achievement_rate,
        "rank": "xxx",
    }

    return response

def lambda_handler(event, context):
    body = json.loads(event["body"])
    target_username = body["username"]

    response = calculate_monthly_achievement(target_username)

    return {
        'statusCode': 200,
        'body': json.dumps({"output_text": response}),
        "headers": {
          "Access-Control-Allow-Origin": "*"
        }
    }
