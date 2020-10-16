$(function () {
    getUserinfo();
    // 退出按钮
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function () {
            // console.log(11);
            localStorage.removeItem('token'); // 清除本地存储的请求头权限
            location.href = '/login.html'; // 跳转到注册页面
            layer.close(index);  // 关闭这个提示信息
        })
    })
})
// 获取用户基本信息
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 渲染头像
            var data = res.data;
            renderAvatar(data);
        },

    })
}
// 渲染头像
function renderAvatar(data) {
    // 如果有昵称，先欢迎昵称，否则欢迎username
    var name = data.nickname || data.username;
    // 如果有头像图片，优先展示图片头像
    if (data.user_pic != null) {
        console.log(data.user_pic);
        $('.layui-nav-img').attr('src', data.user_pic)
        $('.layui-nav-img').show()
        $('.text-avatar').hide()
    } else {
        // 如果有文字，展示首字母大写,或中文首字符
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase() || name[0]); // 展示首字母
    }
    $('#welcome').html('你好!&nbsp;&nbsp;' + name)
}  