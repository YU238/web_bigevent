; (function () {
// 切换登录与注册页面👇
    $('#link_reg').click(function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
// 切换登录与注册页面👆


// 表单正则验证👇
    let form = layui.form
    form.verify({
        
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        repassword: function(value) {
            let repasswordValue = $('.reg-box input[name=password]').val()
            if (repasswordValue !== value) {
                return '两次密码不一致'
            }
        },
    })
// 表单正则验证👆


// 调用接口，提交注册信息👇
    // 根路径 http://api-breakingnews-web.itheima.net/
    let layer = layui.layer;
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()

        let data = {username: $('.reg-box input[name=username]').val(), password: $('.reg-box input[name=password]').val()}
        $.post(
            '/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功！')

                // 跳转到登录页面，并且输入好用户名与密码
                $('#link_login').click()

                $('.login-box [name=username]').val($('.reg-box input[name=username]').val())
                $('.login-box [name=password]').val($('.reg-box input[name=password]').val())
            }
        )
    })
// 调用接口，提交注册信息👆


// 调用接口，登录系统👇
$('#form_login').on('submit', function(e) {
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        data: $(this).serialize(),
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // 弹窗
            layer.msg(res.message)

            // 跳转网页
            // location.assign('https://fanyi.sogou.com/text?keyword=navigate&transfrom=auto&transto=zh-CHS&model=general&fr=websearch_submit')
            // 跳转本地
            location.href = '/index.html'

            //登录成功后将得到的token值，保存到localStorage中
            localStorage.setItem('token', res.token)
        }
        
    })
})
// 调用接口，登录系统👆
})();