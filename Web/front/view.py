# coding=utf-8
from flask import *

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def view():
    return render_template('login.html')


@app.route('/methane/login', methods=['POST'])
def login():
    a = {"error": 0}
    b = {"error": 1}
    c = {"error": 2}

    return json.dumps(a)


@app.route('/dashboard', methods=['GET', 'POST'])
def hi():
    username = "Terabits"
    return render_template('dashboard.html')


@app.route('/setting', methods=['GET', 'POST'])
def setting():
    return render_template('setting.html')


@app.route('/back', methods=['GET', 'POST'])
def back():
    return render_template('backage.html')


@app.route('/methane/display/query/user', methods=['GET'])
def user():
    a = [
        {"userName": '浙江大学玉泉校区7舍', "position": [[120.125632, 30.263538], [120.12554, 30.263067]]},
        {"userName": '杭州中国移动大厦', "position": [[120.159164, 30.273491], [120.159293, 30.273881]]},
        {"userName": '浙大玉泉控制学院', "position": [[120.121023, 30.260390], [120.120993, 30.260081]]},
        {"userName": '浙大紫金港体育馆', "position": [[120.089356, 30.305672], [120.089622, 30.306576]]},
        {"userName": '杭州城西银泰城', "position": [[120.106386, 30.299645], [120.106293, 30.298853]]},
        {"userName": '浙江大学玉泉校区7舍', "position": [[120.125632, 30.263538], [120.12554, 30.263067]]},
        {"userName": '杭州中国移动大厦', "position": [[120.159164, 30.273491], [120.159293, 30.273881]]},
        {"userName": '浙大玉泉控制学院', "position": [[120.121023, 30.260390], [120.120993, 30.260081]]},
        {"userName": '浙大紫金港体育馆', "position": [[120.089356, 30.305672], [120.089622, 30.306576]]},
        {"userName": '杭州城西银泰城', "position": [[120.106386, 30.299645], [120.106293, 30.298853]]},
    ]
    b = json.dumps(a)
    return b


@app.route('/methane/display/query/concentration', methods=['GET'])
def give():
    a = [{"data": [{"concentration": 0.23, "time": "2017-06-30 10:08:31"},
                   {"concentration": 0.36, "time": "2017-06-30 19:28:47"}],
          "facilityIdCode": "1057",
          "location": "zjg",
          "firstAlarm": 0.3,
          "secondAlarm": 0.5,
          "thirdAlarm": 0.7
          },
         {"data": [{"concentration": 0.21, "time": "2017-06-30 10:08:31"},
                   {"concentration": 0.35, "time": "2017-06-30 19:29:23"}],
          "facilityIdCode": "1059",
          "location": "yq",
          "firstAlarm": 0.3,
          "secondAlarm": 0.5,
          "thirdAlarm": 0.7
          },
         {"data": [{"concentration": 0.22, "time": "2017-06-30 10:08:31"},
                   {"concentration": 0.21, "time": "2017-06-30 19:28:57"}],
          "facilityIdCode": "2014",
          "location": "hjc",
          "firstAlarm": 0.3,
          "secondAlarm": 0.5,
          "thirdAlarm": 0.7
          }]
    return json.dumps(a)


@app.route('/methane/display/query/concentration/statistic', methods=['POST', 'GET'])
def statistic():
    a = {
        "min": 0.2,
        "max": 0.4,
        "average": 0.3
    }
    return json.dumps(a)


@app.route('/methane/display/add/facility', methods=['POST'])
def add():
    a = {"error": 0}
    return json.dumps(a)


@app.route('/main', methods=['GET', "POST"])
def mai():
    a = {"error": 0}
    return render_template('main.html')


@app.route('/methane/display/update/facility', methods=['POST'])
def update():
    print'收到修改信息'
    return json.dumps({"error": 0})


@app.route('/methane/display/delete/facility', methods=['POST'])
def delete():
    print'收到删除信息'
    return json.dumps({"error": 0})


@app.route('/methane/display/query/alarm', methods=['GET'])
def alert():
    a = [{"concentration": 12, "facilityIdCode": "1057", "id": 1, "time": "2017-06-21 22:05:00.0", "userName": "user1"},
         {"concentration": 13, "facilityIdCode": "1057", "id": 2, "time": "2017-06-27 10:06:45.0", "userName": "user1"},
         {"concentration": 14, "facilityIdCode": "1057", "id": 3, "time": "2017-06-27 10:06:55.0", "userName": "user1"}]
    return json.dumps(a)


@app.route('/methane/display/query/facility/all', methods=['GET'])
def load():
    data = [
        {
            "username": '食堂',
            "facilityIdCode": '12345678',
            "facilityLocation": '发电机旁',
            "installTime": '2017-6-5',
            "firstLevelAlarmContact": '12345678910',
            "firstLevelAlarmThreshold": '3%',
            "secLevelAlarmContact": '12345678910',
            "secLevelAlarmThreshold": '4%',
            "thirdLevelAlarmContact": '12345678910',
            "thirdLevelAlarmThreshold": '5%'
        },
        {
            "username": '食堂',
            "facilityIdCode": '12345678',
            "facilityLocation": '发电机旁',
            "installTime": '2017-6-5',
            "firstLevelAlarmContact": '12345678910',
            "firstLevelAlarmThreshold": '3%',
            "secLevelAlarmContact": '12345678910',
            "secLevelAlarmThreshold": '4%',
            "thirdLevelAlarmContact": '12345678910',
            "thirdLevelAlarmThreshold": '5%'
        },
        {
            "username": '食堂',
            "facilityIdCode": '12345678',
            "facilityLocation": '发电机旁',
            "installTime": '2017-6-5',
            "firstLevelAlarmContact": '12345678910',
            "firstLevelAlarmThreshold": '3%',
            "secLevelAlarmContact": '12345678910',
            "secLevelAlarmThreshold": '4%',
            "thirdLevelAlarmContact": '12345678910',
            "thirdLevelAlarmThreshold": '5%'
        }
    ]
    print'收到数据请求'
    return json.dumps(data)


if __name__ == '__main__':
    app.run(debug=1, port=8000, host='localhost')
