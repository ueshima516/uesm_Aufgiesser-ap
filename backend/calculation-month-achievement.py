import json
import datetime
import boto3

TABLE_NAME = "fitshow_schedule"


# 先月の年月を計算する
# 日本時間の取得方法の参考記事🧀🐁: https://qiita.com/keisuke0508/items/df2594770d63bf124ccd
DIFF_JST_FROM_UTC = 9
now = datetime.datetime.utcnow() + datetime.timedelta(hours=DIFF_JST_FROM_UTC)
today = now.date()  # 今日


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
    dynamodb = boto3.resource("dynamodb").Table(TABLE_NAME)

    end_date = today.replace(day=1) - datetime.timedelta(days=1)  # 先月最終日
    start_date = end_date.replace(day=1).strftime("%Y%m%d")  # 先月1日 '20230601'
    end_date = end_date.strftime("%Y%m%d")

    # 先月のスケジュールを抽出
    response = dynamodb.query(
        KeyConditionExpression="username = :username AND #date BETWEEN :sk_start AND :sk_end",
        ExpressionAttributeNames={
            "#date": "date"  # ソートキー名が"date"の場合、予約語を避けるためにExpressionAttributeNamesで指定する必要があります
        },
        ExpressionAttributeValues={
            ":username": str(target_username),
            ":sk_start": str(start_date),
            ":sk_end": str(end_date),
        },
    )
    return response["Items"]


def get_ranks(achievement_ratios):
    ranks = {
        "EASY": None,
        "NORMAL": None,
        "HARD": None,
    }
    # BEGINNER 0%, REGULAR 50%, MASTER 75%, LEGEND 90%
    for mode in achievement_ratios.keys():
        if achievement_ratios[mode] is None:
            ranks[mode] = None
        elif achievement_ratios[mode] < 50:
            ranks[mode] = "BEGINNER"
        elif achievement_ratios[mode] < 75:
            ranks[mode] = "REGULAR"
        elif achievement_ratios[mode] < 90:
            ranks[mode] = "MASTER"
        else:
            ranks[mode] = "LEGEND"
    return ranks


def calculate_monthly_achievement(schedules):
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
    mode_achievement_ratios = {
        "EASY": 0,
        "NORMAL": 0,
        "HARD": 0,
    }
    total_achievement_ratio = 0

    for schedule in schedules:
        menu_list = schedule["menu_list"]
        mode = schedule["mode"]  # " EASY"とか
        total_schedules[mode] += len(menu_list)  # 1日の
        done_schedules[mode] += sum(1 for menu in menu_list if menu["is_done"])

    # 先月の達成率を計算
    total_cnt = 0
    done_cnt = 0

    for mode in mode_achievement_ratios.keys():
        if total_schedules[mode] > 0:
            total_cnt += total_schedules[mode]
            done_cnt += done_schedules[mode]
            mode_achievement_ratios[mode] = int(
                (done_schedules[mode] / total_schedules[mode]) * 100
            )
        else:
            mode_achievement_ratios[mode] = None

    if total_cnt > 0:
        total_achievement_ratio = int(done_cnt / total_cnt * 100)
    else:
        total_achievement_ratio = None

    response = {
        "total_achievement_ratio": total_achievement_ratio,
        "mode_achievement_ratios": mode_achievement_ratios,
    }

    return response


def lambda_handler(event, context):
    body = json.loads(event["body"])
    target_username = body["username"]

    # 先月のスケジュールを取得🔍
    schedules = extract_last_month_schedules(target_username)
    response = calculate_monthly_achievement(schedules)
    ranks = get_ranks(response["mode_achievement_ratios"])
    response.update({"ranks": ranks})

    return {
        "statusCode": 200,
        "body": json.dumps({"output_text": response}),
        "headers": {"Access-Control-Allow-Origin": "*"},
    }
