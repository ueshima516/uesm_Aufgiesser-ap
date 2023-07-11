import json

def load_data_from_json(file_path):
    with open(file_path, 'r') as file:
        data = json.load(file)
    return data

def search_element_by_date(data, date_value):
    dic = {}
    for key, inner_dict in data.items():
        if inner_dict.get("date") == date_value:
          dic.update({key: inner_dict})
          # return inner_dict
    return dic

# JSONファイルからデータを読み込む
DATA = load_data_from_json("./test.json")

# DATEで日付を指定して要素を検索する
DATE_TO_SEARCH = "2023/08/01"
result = search_element_by_date(DATA, DATE_TO_SEARCH)

# 検索結果を出力する
if result != {}:
    formatted_date = result.get("date")
    # print(formatted_date, result)
    print(result)
else:
    print("指定した日付の要素は見つかりませんでした。")
