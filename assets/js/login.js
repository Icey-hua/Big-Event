$(function () {
    // layui的提示弹出层
    var layer = layui.layer;
    // 表单验证
    var form = layui.form;
    form.verify({
        // 自定义校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格!'
        ],
        repwd: function (value) {
            var pwd_str = $('.reg-box [name=password]').val();
            if (pwd_str !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 点击去注册，跳转
    $('#link_reg').on('click', function () {
        $('.reg-box').show();
        $('.login-box').hide()
    })
    // 点击去登录,跳转
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show()
    })


    // 注册请求

    $('#form-reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(), //xhhya
                password: $('.reg-box [name=password]').val() // 111111
            },
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg('注册成功!')
                    $('#link_login').click(); // 注册成功后自动跳到登录页面
                }
            }

        })
    })

    // 登录请求
    $('#form-login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            // data: {
            //     username: $('.login-box [name=username]').val(),
            //     password: $('.login-box [name=password]').val()
            // },
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg('登录成功!');

                    // console.log(res.token);
                    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwNjQsInVzZXJuYW1lIjoieGhoeWEiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTYwMjY4MTc4OCwiZXhwIjoxNjAyNzE3Nzg4fQ.FmLL_LgCF2Tg3xHRgbIMXc4g3oYAJzpzlTlDo3mbp5o
                    localStorage.setItem('token', res.token)
                    // 跳转到后台主页
                    location.href = './index.html'

                }
            }

        })
    })
})