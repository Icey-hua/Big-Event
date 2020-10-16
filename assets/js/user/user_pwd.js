$(function () {
    // 重置密码表单设置规则
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码长度必须在6~12位，且不能出现空格！'],
        // 确认密码和新密码必须一致
        confirm: function (value) {
            if (value !== $('input[name="newpwd"]').val()) {
                return "两次输入密码不一致!"
            }
        }
    })
    // 新密码和原密码不能相同
    $('input[name="newpwd"]').on('blur', function () {
        if ($(this).val() == $('input[name="oldpwd"]').val()) {
            return layui.layer.msg("新密码不能和原密码相同")
        }
    })

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('input[name="oldpwd"]').val(), // 后台会判断原密码输入是否正确
                newPwd: $('input[name="newpwd"]').val()
            },
            success: function (res) {
                // console.log(res); 
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                } else {
                    layui.layer.msg('更新密码成功!');
                    $('.layui-form')[0].reset()
                }
            }
        })
    })

})