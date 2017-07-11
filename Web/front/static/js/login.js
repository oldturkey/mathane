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
                    window.location.href = "/main";
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