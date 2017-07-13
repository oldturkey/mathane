$(function () {
    // 初始化 传入dom id
    var victor = new Victor("container", "output");
    var theme = [
        ["#002c4a", "#005584"],
        ["#35ac03", "#3f4303"],
        ["#d4d0d4", "#cdcccc"],
        ["#18bbff", "#00486b"]
    ];
    var color = theme[2];
    victor(color).set();
});

function login() {
    var account = $("#accountName").val();
    var password = $("#password").val();
    $.ajax({
        type: 'POST',
        url: '/methane/login',
        data: {
            "account": account,
            "password": password
        },
        dataType: 'json',
        success: function (data) {
            switch (data["error"]) {
                case 0:
                    window.location.href = "/dashboard";
                    break;
                case 1:
                    alert("密码错误");
                    break;
                case 2:
                    alert("用户名错误");
                    break;
            }
        }
    });
}