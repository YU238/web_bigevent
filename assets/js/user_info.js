; (function () {
    let layer = layui.layer
    // 定义form
    let form = layui.form

    // 用layui的方法定义正则
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称不超过6个字"
            }
        }
    })

    initUserInfo()

    // 重置按钮
    $('[type=reset]').click(function(e) {
        // 阻止重置
        e.preventDefault()
        // 重新渲染
        initUserInfo()
    })

    // 提交修改
    $('#form_UserInfo').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }

                layer.msg('更新用户信息成功')
                initUserInfo()

                // 调用index页面的渲染头像函数，重新渲染名字和头像
                window.parent.getUserInfo()
            }
        })
    })

    // 调用ajax获取用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }

                // 快速给表单添加内容
                form.val('formUserInfo', res.data)


            },
        })
    }
})();




