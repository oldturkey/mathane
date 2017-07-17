var namePositionList;
var userList = [];
var firstUser;
var positionMarkList = [];
var map;//统一的地图全局变量
var beginTime = getMidnight();
var endTime = getNowFormatDate();
$(function () {
    //选择器->地图->【图表->统计表盘，受时间选择约束】
    selectInit();
    //【下一版程序，报警，受选择器和时间选择约束】
});

//选择器内容出现变化
function selectChange() {
    var selectUserName = $(".selectpicker").val();
    for (var i = 0; i < namePositionList.length; i++) {
        if (selectUserName === namePositionList[i]["userName"]) {
            map.setZoomAndCenter(20, namePositionList[i]["position"][0]);
            break;
        }
    }
    plotData(selectUserName, beginTime, endTime);
    statistic(selectUserName, beginTime, endTime);
    alarmInit(selectUserName, beginTime, endTime);
}

function timeSubmit() {
    //改写了全局变量数值
    beginTime = $("#timeBegin").val() + ':00';
    endTime = $("#timeEnd").val() + ':00';
    var selectUserName = $(".selectpicker").val();
    plotData(selectUserName);
    statistic(selectUserName);
    alarmInit(selectUserName);
}
//选择器初始化，查询所有用户记录
function selectInit() {
    $.ajax({
        type: "GET",
        url: "/methane/display/query/user",
        dataType: "json",
        success: function (jsonList) {
            namePositionList = jsonList;
            for (var i = 0; i < jsonList.length; i++) {
                userList.push(jsonList[i]["userName"]);
            }
            selectPickerInit(userList);
            firstUser = userList[0];
            plotData(firstUser,beginTime,endTime);
            statistic(firstUser,beginTime,endTime);
            alarmInit(firstUser,beginTime,endTime);
        
            var center = jsonList[0]["position"][0];
            for (i = 0; i < jsonList.length; i++) {
                positionMarkList.push(jsonList[i]["position"]);
            }
            gaodemap(center, positionMarkList);
        },
        error: function () {
            alert('数据加载失败,请检查与主机连接')
        }
    });
}

function selectPickerInit(userNameList, beginTime, endTime) {
    for (var i = 0; i < userNameList.length; i++) {
        if (i === 0) {
            //默认选中第一个用户
            $(".selectpicker").append("<option selected='selected'>" + userNameList[i] + "</option>");
        }
        else {
            $(".selectpicker").append("<option>" + userNameList[i] + "</option>");
        }
        $(".selectpicker").selectpicker('refresh');
        $(".selectpicker").selectpicker('render');
    }
}
//依据用户选择器的用户名选择得到设备Id的list
function plotData(selectUserName) {
    var sendData = {"userName": selectUserName, "beginTime": beginTime, "endTime": endTime};
    $.ajax({
        type: "GET",
        url: "/methane/display/query/concentration",
        dataType: "json",
        data: sendData,
        success: function (dataList) {
            //第一层，获得设备终端名称以及以下对应数据
            var series = [];
            for (var i = 0; i < dataList.length; i++) {
                var part = {};
                //将显示名称为设备地址
                part["name"] = dataList[i]["location"];//
                part["data"] = [];
                var data = dataList[i]["data"];
                for (var j = 0; j < data.length; j++) {
                    var time = data[j]["time"];
                    time = convertDateFromString(time);
                    var concentration = data[j]["concentration"];
                    part["data"].push([time, concentration]);
                }
                series.push(part);
            }
            //假设一个用户的所有设备都具有一样的三级报警阈值
            var firstAlarm = dataList[0]["firstAlarm"];
            var secondAlarm = dataList[0]["secondAlarm"];
            var thirdAlarm = dataList[0]["thirdAlarm"];
            var alarmValue = {"firstAlarm": firstAlarm, "secondAlarm": secondAlarm, "thirdAlarm": thirdAlarm};
            chartInit(series, alarmValue);
        },
        error: function () {
            alert('数据加载失败,请检查与主机连接')
        }
    });

}
//将字符串转化为时间UTC格式
function convertDateFromString(dateString) {
    var year = Number(dateString.substring(0, 4));
    var month = Number(dateString.substring(5, 7));
    var day = Number(dateString.substring(8, 10));
    var hour = Number(dateString.substring(11, 13));
    var minute = Number(dateString.substring(14, 16));
    var second = Number(dateString.substring(17, 19));
    return Date.UTC(year, month, day, hour, minute, second);
}
//表格初始化
function chartInit(series) {
    var alarmValue = arguments[1] ? arguments[1] : {"firstAlarm": 0.6, "secondAlarm": 0.7, "thirdAlarm": 0.8};
    var title = {
        text: '沼气浓度变化'
    };

    var xAxis = {
        type: "datetime"
    };
    var yAxis = {
        minRange: alarmValue["thirdAlarm"],
        min: 0,//必须要加，不然三级报警线在较大的时候显示不出来
        title: {
            text: '沼气浓度 (%)'
        },
        labels: {
            formatter: function () {
                return this.value + '%'
            }
        },

        plotLines: [
            {
                value: alarmValue["firstAlarm"],
                width: 2,
                color: '#f79992',
                dashStyle: 'solid',
                label: {
                    align: 'right',
                    style: {color: '#f79992', fontWeight: 'bold'},
                    text: '一级报警界限'
                }

            },
            {
                value: alarmValue["secondAlarm"],
                width: 2,
                color: '#f46e65',
                dashStyle: 'solid',
                label: {
                    align: 'right',
                    style: {color: '#f46e65', fontWeight: 'bold'},
                    text: '二级报警界限'
                }
            },
            {
                value: alarmValue["thirdAlarm"],
                width: 2,
                color: '#f04134',
                dashStyle: 'solid',
                label: {
                    align: 'right',
                    style: {color: '#f04134', fontWeight: 'bold'},
                    text: '三级报警界限'
                }
            }
        ]

    };
    var credits = {
      enabled: false
    };

    var chart = {
        backgroundColor:'#f5f5f5',
        type: 'line',
        zoomType: 'x',
        resetZoomButton: {
            position: {
                x: 0,
                y: -70
            }
        }
    };

    var tooltip = {
        valueSuffix: '%'
    };

    var legend = {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    };

    // 改变数据点的大小以及数据的宽度
    var plotOptions = {
        series: {
            lineWidth: 1, //定义绘制曲线的线条宽度
            marker: {
                radius: 4
            }
        }
    };

    var json = {};

    var alertSeries = [{}];
    json.title = title;
    json.xAxis = xAxis;
    json.yAxis = yAxis;
    json.tooltip = tooltip;
    json.chart = chart;
    json.legend = legend;
    json.credits = credits;
    json.series = series;
    json.plotOptions = plotOptions;

    $('#chart').highcharts(json);
}
//报警栏初始化
function alarmInit(userName,beginTime,endTime) {
    var userName = userName;
    var beginTime = arguments[0] ? arguments[0] : 0;
    var endTime = arguments[1] ? arguments[1] : 0;
    $body = $("#alertTableBody");
    $.ajax({
        type: "GET",
        url: "/methane/display/query/alarm",
        dataType: "json",
        data: {"userName": userName, "beginTime": beginTime, "endTime": endTime},
        success: function (alertList) {
            var str = "";
            var trClass = '';

            for (var i = 0; i < alertList.length; i++) {
                switch (alertList[i]["alarmLevel"]){
                    case 1:{trClass='info1';} break;
                    case 2:{trClass='warning1';} break;
                    case 3:{trClass='danger1';} break;
                }
                str += "<tr class="+trClass+">" +
                    "<td>" + alertList[i]["time"].substring(0, 19) + "</td>" +
                    "<td>" + alertList[i]["userName"] + "</td>" +
                    "<td>" + alertList[i]["facilityIdCode"] + "</td>" +
                    "<td>" + alertList[i]["concentration"] + "</td>" +
                    "<td >" + alertList[i]["alarmLevel"] + "</td>" +
                    "</tr>";
            }
            $("#alertTableBody").html(str);
            
                fixScroll();
            
            
        },
        error: function () {
            alert('报警数据加载失败,请检查与主机连接')
        }
    });

}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var hour = date.getHours();
    if (hour <= 9) {
        hour = "0" + hour;
    }
    var minute = date.getMinutes();
    if (minute <= 9) {
        minute = "0" + minute;
    }
    var second = date.getSeconds();
    if (second <= 9) {
        second = "0" + second;
    }

    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + hour + seperator2 + minute
        + seperator2 + second;
    return currentdate;
}

function getMidnight() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " 00:00:00";
    return currentdate;
}

function gaodemap(center, positionMarkList) {
    map = new AMap.Map('gaodemap', {
        resizeEnable: true,
        zoom: 11,
        center: center
    });
    map.plugin(["AMap.ToolBar"], function () {
        map.addControl(new AMap.ToolBar());
    });
    var icon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
    // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
    positionMarkList.forEach(function (marker) {
        for (var i = 0; i < marker.length; i++) {
            new AMap.Marker({
                map: map,
                icon: icon,
                position: marker[i]
            });
        }
    });
}

function statistic(userName, beginTime, endTime) {
    var sendData = {
        "userName": userName,
        "beginTime": beginTime,
        "endTime": endTime
    };
    $.ajax({
        type: "GET",
        url: "/methane/display/query/concentration/statistic",
        dataType: "json",
        data: sendData,
        success: function (statisticValue) {
            var min = statisticValue["min"];
            var max = statisticValue["max"];
            var average = statisticValue["average"];
            ////将显示数据更改为新数据
            $("#min").text(min + '%');
            $("#max").text(max + '%');
            $("#average").text(average + '%');
        },
        error: function () {
            alert('统计数据加载失败,请检查与主机连接')
        }
    });
}