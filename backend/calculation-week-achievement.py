import json
import datetime
import boto3

TABLE_NAME = "fitshow_schedule"

DIFF_JST_FROM_UTC = 9
# 今日の日付を取得
today = datetime.datetime.utcnow() + datetime.timedelta(hours=DIFF_JST_FROM_UTC)
today_weekday = today.weekday()  # 今日の曜日を取得 (0: 月曜日, 1: 火曜日, ..., 6: 日曜日)
# 今週の月曜日の日付を計算
this_week_monday = today - datetime.timedelta(days=today_weekday)


def extract_last_4weeks_schedules(target_username):
    # データベースから指定したユーザーのスケジュールを取得する
    dynamodb = boto3.resource("dynamodb").Table(TABLE_NAME)
    end_date = (this_week_monday.date() - datetime.timedelta(days=1)).strftime("%Y%m%d")
    start_date = (this_week_monday - datetime.timedelta(days=7 * 4)).strftime("%Y%m%d")

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


def filter_by_date(data_list, start_date, end_date):
    filtered_data = []
    for item in data_list:
        date_str = item["date"]
        if start_date <= date_str <= end_date:
            filtered_data.append(item)
    return filtered_data


def calculate_weekly_achievements(schedules):
    start_date = this_week_monday - datetime.timedelta(days=7 * 4)  # 4週前月曜

    response = {}
    for _ in range(4):  # 0,1,2,3
        end_date = start_date + datetime.timedelta(days=6)

        start_date_str = start_date.strftime("%Y%m%d")
        end_date_str = end_date.strftime("%Y%m%d")

        weekly_schedules = filter_by_date(schedules, start_date_str, end_date_str)

        # weekly_schedules から 週の達成率を計算
        total_cnt = 0
        done_cnt = 0
        for schedule in weekly_schedules:
            menu_list = schedule["menu_list"]
            total_cnt += len(menu_list)  # 1日の
            done_cnt += sum(1 for menu in menu_list if menu["is_done"])

        if total_cnt > 0:
            total_achievement_ratio = int(done_cnt / total_cnt * 100)
        else:
            total_achievement_ratio = None

        response[start_date_str + "_" + end_date_str] = total_achievement_ratio

        start_date += datetime.timedelta(days=7)  # 次の週の月曜

    return response


def lambda_handler(event, context):
    body = json.loads(event["body"])
    target_username = body["username"]

    # 先月のスケジュールを取得🔍
    schedules = extract_last_4weeks_schedules(target_username)
    response = calculate_weekly_achievements(schedules)

    return {
        "statusCode": 200,
        "body": json.dumps({"output_text": response}),
        "headers": {"Access-Control-Allow-Origin": "*"},
    }
