$.ajaxPrefilter(function (options) {
    // console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 以 /my 开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // bug:会先请求成功之后调用完成的回调函数再退出登录
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // console.log('失败');
            localStorage.removeItem('token')
            location.href = './login.html';

        }
    }
})