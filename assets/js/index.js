; (function () {

    getUserInfo()

    let layer = layui.layer
    $('#quit').click(function () {
        layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {
            // 点击确认后，执行的操作
            // 清空本地存储的token值
            localStorage.removeItem('token')
            // 跳转回登录页面
            location.href = '/login.html'

            layer.close(index);
        });
    })

    
})()

function getUserInfo() {
    // 携带请求头才能访问
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            if (res.status !== 0) {
                return console.log('获取用户失败')
            }

            // 调用渲染头像，用户名函数
            renderAvatar(res.data)
        },

        // 如果跳过登录，直接打开首页，就要强制清空本地token并且跳转回登录页
        complete: function(res) {
            console.log(res)
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 强制清除本地token
                localStorage.removeItem('token')
                // 强制跳转回登录页
                location.href = '/login.html'
            }
        }
    })
}

function renderAvatar(user) {
    // 渲染用户名
    let name = user.nickname || user.username
    $('.username').html('欢迎&nbsp&nbsp' + name)
    console.log(user)
    // 渲染头像
    if (!user.user_pic) {
        $('.layui-nav-img').hide()
        $('.text-avatar').html(name[0].toUpperCase()).show()
    } else {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
}