import json

# 後々 data は DBから読み込めるようにする
data = {"output_text": {"b25f387c-2155-11ee-b258-825e158fd254": {"date": "2023/08/01", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3ac0-2155-11ee-b258-825e158fd254": {"date": "2023/08/05", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3bba-2155-11ee-b258-825e158fd254": {"date": "2023/08/08", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3c96-2155-11ee-b258-825e158fd254": {"date": "2023/08/12", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}, "b25f3d5e-2155-11ee-b258-825e158fd254": {"date": "2023/08/15", "start_time": "10:00", "end_time": "11:30", "work_time": "30", "menu": "running"}}}

def search_element_by_date(data, date_value):
    dic = {}
    for key, inner_dict in data.items():
        if inner_dict.get("date") == date_value:
          dic.update({key: inner_dict})
    return dic

def lambda_handler(event, context):
    # DATEで日付を指定して要素を検索する
    DATE_TO_SEARCH = "2023/08/01"
    result = search_element_by_date(data["output_text"], DATE_TO_SEARCH)
    
    # 検索結果を出力する
    if result != {}:
        print(result)
    else:
        print("指定した日付の要素は見つかりませんでした。")
    
    return {
        'statusCode': 200,
        'body': json.dumps({"output_text": result})
    }
