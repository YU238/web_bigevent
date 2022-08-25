; (function () {
    let form = layui.form
    let layer = layui.layer
    

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        samepass: function(value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        
        repass: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '确保输入的两次新密码相同'
            }
        },

    })

    // 绑定提交事件，进行密码修改i
    $('.layui-form').on('submit', function(e){
        // 先阻止默认提交
        e.preventDefault()

        // 发起ajax请求
        $.ajax({
            url: '/my/updatepwd',
            method: 'POST',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改密码失败')
                }
                layer.msg('修改密码成功')

                // 成功后，要把表单内容清除
                $('.layui-form')[0].reset()
            }
        })
    })
})()