$(function () {
    // 数据处理函数（查询字符串转为对象）
    function dataResolve(data) {
        var arr = data.replace(/=/g, '&').replace('%40', '@').split('&');
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
            if (i % 2 === 0) obj[arr[i]] = arr[i + 1];
        }
        return obj
    }
    // 表单昵称验证
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1~6位之间!'
            }
        }
    })

    // 初始化用户信息
    initUser();
    function initUser() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                // console.log(res);    
                form.val('user_infoForm', res.data); // 根据res.data快速填写表单信息
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUser();
    })

    // 用户自定义个人信息，提交修改
    $(".layui-form").on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                } else {
                    // 更新后有昵称了，首页改成欢迎昵称
                    window.parent.getUserinfo()
                    return layer.msg('修改成功啦!')
                }
            }
        })
    })
})