var $table = $('#table-setting'),
    $remove = $('#btn_delete'),
    $add = $('#btn_add'),
    $edit = $('#btn_edit'),
    $form = $('#form');

$(function () {
    //初始化表格
    $table = $('#table-setting'),
        $remove = $('#btn_delete'),
        $add = $('#btn_add'),
        $edit = $('#btn_edit');
    tableInit();

});

function tableInit() {
    //表格初始化
    $table.bootstrapTable({
        // 对表格使用第三方api绘制
        url: '/methane/display/query/facility/all',         //请求后台的URL（*）
        method: 'GET',                      //请求方式（*）
        toolbar: '#toolbar',
        search: true,                       //是否显示表格搜索，此搜索是客户端搜索
        // strictSearch: true,                 //采用严格查询
        searchTimeOut: 500,                  //搜索超时的时间
        showColumns: true,                  //是否显示所有的列
        showRefresh: true,                  //是否显示刷新按钮
        striped: true,                              //是否显示行间隔色
        cache: false,
        // clickToSelect: true,                //是否启用点击选中行
        // height: 850,                        //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "DivID",                     //每一行的唯一标识，一般为主键列
        pagination: true,                    //显示分页符号
        sidePagination: 'client',            //在客户端进行分页
        pageNumber: 1,                       //首页页码
        pageSize: 20,                        //每一页的数据条数

        // cardView: false,                    //是否显示详细视图
        editable: true,
        //编辑后自动提交数据
        onEditableSave: function (field, row, oldValue, $el) {
            $.ajax({
                type: "POST",
                url: "/methane/display/update/facility",
                data: row,//需要提交本编辑行的所有数据
                dataType: "json",
                success: function (query) {
                    //加载数据成功
                },
                error: function () {
                    alert('编辑提交失败，请检查与主机连接');
                }
            })
        },
        columns: [{
            checkbox: true
        }, {
            field: 'userName',
            title: '用户名称',
            align: 'center',
            editable: true
        }, {
            field: 'facilityIdCode',
            title: '设备标识码',
            align: 'center'
        }, {
            field: 'facilityLocation',
            title: '设备位置',
            align: 'center',
            editable: true
        }, {
            field: 'installTime',
            title: '安装时间',
            align: 'center',
        }, {
            field: 'firstLevelAlarmContact',
            title: '一级报警联系方式',
            align: 'center',
            editable: true
        }, {
            field: 'firstLevelAlarmThreshold',
            title: '一级报警阈值',
            align: 'center',
        }, {
            field: 'secLevelAlarmContact',
            title: '二级报警联系方式',
            align: 'center',
            editable: true
        }, {
            field: 'secLevelAlarmThreshold',
            title: '二级报警阈值',
            align: 'center',
        }, {
            field: 'thirdLevelAlarmContact',
            title: '三级报警联系方式',
            align: 'center',
            editable: true
        }, {
            field: 'thirdLevelAlarmThreshold',
            title: '三级报警阈值',
            align: 'center',
        }]
    });
    //检测是否激活删除按钮
    $table.on('check.bs.table uncheck.bs.table ' + 'check-all.bs.table uncheck-all.bs.table', function () {
        $("#btn_delete").prop('disabled', !$table.bootstrapTable('getSelections').length);
    });
    $table.on('editable-shown.bs.table', function () {
        console.log('有元素开始编辑了')
    });
}

// 自动刷新
setInterval(function () {
    $table.bootstrapTable('resetView');
}, 200);


function deletes() {
    //得到选中的对象，返回类型是一列数据
    var deleteList = $('#table-setting').bootstrapTable('getSelections');
    var jsonList = JSON.stringify(deleteList);
    var length = deleteList.length;
    if (length > 0) {
        // 删除确认
        var conf = confirm('确定要删除这些数据吗？');
        if (conf === true) {
            // 将DivID传到后台删除
            // 将DivID传到后台删除
            $.ajax({
                type: "POST",
                url: "/methane/display/delete/facility",
                data: {"facility": jsonList},//需要提交json数据
                dataType: "json",
                success: function (back) {
                    if (back["error"] === 1) {
                        alert('删除失败，请检查与主机连接');
                        $table.bootstrapTable('resetView');
                        window.location.reload();
                    }
                    window.location.reload();
                }
            });
        }
    }
};

//添加纪录
function add(data) {
    //编辑数据阶段
    $("#modal").modal({
        show: true
    });
}

function submit_data() {
    // $("#form").getElementsByName()
    var data = {
        userName: $("#userName").val(),  //String，用户名称
        facilityIdCode: $("#facilityIdCode").val(), //String，设备id编号
        facilityLocation: $("#facilityLocation").val(),//String，设备位置
        installTime: $("#installTime").val(),  //String，安装时间
        firstLevelAlarmContact: $("#firstLevelAlarmContact").val(), //String，一级报警联系方式
        firstLevelAlarmThreshold: $("#firstLevelAlarmThreshold").val(), //double，一级报警阈值
        secLevelAlarmContact: $("#secLevelAlarmContact").val(),//String，二级报警联系方式
        secLevelAlarmThreshold: $("#secLevelAlarmThreshold").val(),  //double，二级报警阈值
        thirdLevelAlarmContact: $("#thirdLevelAlarmContact").val(), //String，三级报警联系方式
        thirdLevelAlarmThreshold: $("#thirdLevelAlarmThreshold").val(),//double，三级报警阈值
        longitude:parseFloat($("#coordinate").val().split(",")[0]),//double，经度
        latitude:parseFloat($("#coordinate").val().split(",")[1])//double, 维度
    };


    // 数据向后端提交
    $.ajax({
        type: "POST",
        url: "/methane/display/add/facility",
        data: data,//需要提交json数据
        dataType: "json",
        success: function (back) {
            if (back["error"] === 0) {
                $table.bootstrapTable('append', data);
                $table.bootstrapTable('resetView');
                // $table.bootstrapTable('insertRow', {index:$table.bootstrapTable('getOptions').totalRows, row:data});
            }
            else {
                alert('数据添加失败,可能由重复提交或断开连接导致')
            }
        }
    });
    //在表格中添加这条记录
    console.log('执行了add');
}

function clean() {
    $(".modal-input").val("");
}