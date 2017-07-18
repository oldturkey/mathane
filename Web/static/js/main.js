$(document).ready(function () {
    
    // 随机数据
    var data = [{
        "name": "杭州",
        "value": 06
        }, {
        "name": "宁波",
        "value": 01
        }, {
        "name": "温州",
        "value": 01
        }, {
        "name": "嘉兴",
        "value": 02
        }, {
        "name": "湖州",
        "value": 01
        }, {
        "name": "绍兴",
        "value": 01
        }, {
        "name": "金华",
        "value": 03
        }, {
        "name": "衢州",
        "value": 01
        }, {
        "name": "舟山",
        "value": 00
        }, {
        "name": "台州",
        "value": 00
        }, {
        "name": "丽水",
        "value": 00
        }];
    // 初始化图表
    var map = new Highcharts.Map('map', {
        chart: {
            backgroundColor: "#56607b",
            height: '110%'
        },
        title: {
            text: '今日报警数量分布图',
            margin: 35,
            style: {
                "color": "#fff",
                "fontSize": "22px",
            }
        },
        colorAxis: {
            min: 0,
            max: 10,
            minColor: '#fef0ef',
            maxColor: '#f04134',
            labels: {
                style: {
                    "color": "#fff"
                }
            }
        },
        legend: {
            title: {
                text: '报警数量：',
                style: {
                    "color": "#fff"
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            data: data,
            name: '报警数量',
            mapData: Highcharts.maps['cn/zhejiang'],
            joinBy: 'name' // 根据 name 属性进行关联
            }]
    });
    $('.highcharts-name-杭州').click(function () {
        window.open('/dashboard');
    });



    //30天报警等级分布
    $(function () {
        $('#alertLevel').highcharts({
            chart: {
                backgroundColor: "#56607b",
                type: 'column'
            },
            title: {
                text: '30天报警等级占比',
                style: {
                    "color": "#fff",
                    "fontSize": "18px"
                }
            },
            xAxis: {
                categories: ['杭州', '金华', '绍兴', '温州', '台州', '湖州', '丽水', "衢州", "宁波", "舟山", "绍兴"],
                labels: {
                    style: {
                        "color": "#fff"
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: '各级报警百分比(%)',
                    style: {
                        "color": "#fff"
                    }
                },
                labels: {
                    style: {
                        "color": "#fff"
                    }
                }
            },
            legend: {
                itemStyle: {
                    color: '#fff'
                }
            },
            credits: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
                shared: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            series: [{
                name: '一级报警',
                data: [7, 6, 8, 7, 5, 7, 6, 3, 4, 7, 5],
                color: '#fef0ef'
        }, {
                name: '二级报警',
                data: [2, 3, 1, 2, 3, 2, 1, 2, 3, 2, 4],
                color: '#fabeb9'
        }, {
                name: '三级报警',
                data: [1, 2, 1, 2, 2, 2, 3, 4, 4, 2, 1],
                color: '#f46e65'
        }]
        });
    });
    
    //7日报警占比
    $(function() {
            $('#ScaleMap').highcharts({
                chart: {
                    backgroundColor: "#56607b",
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '沼气监测点数量分布',
                    style: {
                        "color": "#fff",
                        "fontSize": "16px",
                        "font-weight": "bold"
                    }
                },
                tooltip: {
                    headerFormat: '{series.name}<br>',
                    pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                legend: {
                    itemStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    type: 'pie',
                    name: '监测点数量占比',
                    data: [{
                            name: '金华',
                            y: 16.0,
                            //                    color:"#FFA33E"
                        },
                        {
                            name: '杭州',
                            y: 45.0,
                            sliced: true,
                            selected: true,
                            color: "#76E2F4"
                        },
                        {
                            name: '湖州',
                            y: 16.0,
                            //                    color:"#9FEED1"
                        },
                        {
                            name: '温州',
                            y: 16.0,
                            //                    color:"#FFF6A2"
                        },
                        {
                            name: '其他',
                            y: 16.0,
                            //                    color:"#FACBF8"
                        },
                    ]
                }]
            });


            $(function() {
                $('#container').highcharts({
                    chart: {
                        backgroundColor: "#56607b",
                        type: 'line'
                    },
                    title: {
                        text: '月平均浓度图',
                        style: {
                            "color": "#fff",
                            "fontSize": "18px"
                        }
                    },
                    xAxis: {
                        categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        labels: {
                            style: {
                                "color": "#fff"
                            }
                        }
                    },
                    yAxis: {
                        title: {
                            text: '沼气浓度 (%)',
                            style: {
                                "color": "#fff"
                            }
                        },
                        labels: {
                            style: {
                                "color": "#fff"
                            }
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        itemStyle: {
                            color: '#fff'
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: true // 开启数据标签
                            },
                            enableMouseTracking: false // 关闭鼠标跟踪，对应的提示框、点击事件会失效
                        }
                    },
                    series: [{
                        name: '杭州',
                        data: [27.0, 16.9, 19.5, 24.5, 18.4, 21.5, 25.2, 26.5, 33.3, 18.3, 13.9, 9.6],
                    }, {
                        name: '金华',
                        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
                        color:"#76d0a3"
                    }]
                });
            });
        });
});
